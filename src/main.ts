import './style.css'
import { connectToServer } from './socket.client.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Websocket - Client</h2>
    <input id="jwtToken" placeholder="Json Web Token" />
    <button id="connect">Connect</button>

    <br/><br/>
    <span id="server-status">offline</span>

    <ul id="clients">
      <li>ASA</li>
    </ul>

    <form id="message-form">
      <input placeholder="message" id="message-input" />
    </form>

    <h3>Messages</h3>
    <ul id="messages"></ul>
  </div>
`

//setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
//connectToServer();

const jwtToken = document.querySelector<HTMLInputElement>('#jwtToken')!;
const connectButton = document.querySelector('#connect')!;

connectButton.addEventListener('click', () =>{

  if(jwtToken.value.trim().length <= 0) return alert('Please enter JWT');
  connectToServer( jwtToken.value.trim() )
})