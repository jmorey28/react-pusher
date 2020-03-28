import React from 'react';
import ChatRoom from './components/ChatRoom'
import Pusher from 'pusher-js'
import axios from 'axios';

import './App.css';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      messages: [],
      messageInput: ''
    }
  }
  componentDidMount(){
    var pusher = new Pusher('APP_KEY', {
      cluster: 'APP_CLUSTER',
      forceTLS: true
    });

    var channel = pusher.subscribe('chat');
    channel.bind('message', function(data) {
      alert(JSON.stringify(data));
    });
  }
  render(){
    const {messages, messageInput} = this.state
    return (
      <div className="App">
        <ChatRoom handleMessageInputChange={this.handleMessageInputChange}
                  handleMessageInputKeyPress={this.handleMessageInputKeyPress}
                  messageInput={messageInput}
                  messages={messages}/>
      </div>
    );
  }
  handleMessageInputChange = (event) => {
    this.setState({messageInput: event.target.value})
  }
  handleMessageInputKeyPress = (event) => {
    const key = event.key || event.keyCode
    if(key === 'Enter' || key === 13){
       event.preventDefault()
       const payload = {
         message: this.state.messageInput
       }
       axios.post('http://localhost:8080/message', payload)
    } 
  }
}

export default App;
