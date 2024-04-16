import {Manager, Socket} from 'socket.io-client'

let socket: Socket;

export const connectToServer = ( token: string) => {

    const manager = new Manager(import.meta.env.URL_SOCKET, {
        extraHeaders: {
            authorization: `${token}`
        }
    });

    socket?.removeAllListeners();
    socket = manager.socket('/');

    addListeners()
    
}

const addListeners = () => {

    const serverStatusLabel = document.querySelector('#server-status')!;

    const clientsList = document.querySelector('#clients')!;

    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput  = document.querySelector<HTMLInputElement>('#message-input')!;

    const messagesUl = document.querySelector<HTMLDListElement>('#messages')!;


    socket.on('connect', () => {
        console.log('connected');
        serverStatusLabel.innerHTML = 'Online';
    })


    socket.on('disconnect', () => {
 
        serverStatusLabel.innerHTML = 'Disconnected';
    })

    socket.on('clients-updated', (clients: string[]) => {
        console.log('clients-updated', clients);
        
        clientsList.innerHTML = '';
        clients.forEach(client => {
            const li = document.createElement('li');
            li.innerHTML = client;
            clientsList.appendChild(li);
        })
    })

    messageForm.addEventListener('submit', (event: Event) => {
        event.preventDefault();
        
        if(messageInput.value.trim().length <=0) return;

        socket.emit('message-from-client', 
                    {id: 'Name', message: messageInput.value}
                );
        
        messageInput.value = '';
    })

    socket.on('message-from-server', (payload: {fullName: string, message: string}) => {
        
        const newMessage = `
            <li>
                <strong>${payload.fullName}</strong>
                <span>${payload.message}</span>
            </li>
        `;

        const li = document.createElement('li');

        li.innerHTML = newMessage;
        messagesUl.append(li);
    })
}