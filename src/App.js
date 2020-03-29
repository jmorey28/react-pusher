import React from 'react';
import ChatRoom from './components/ChatRoom'
import LoginModal from './components/LoginModal'
import Pusher from 'pusher-js'
import axios from 'axios';

import './App.css';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      loginVisible: true,
      messages: [],
      messageInput: '',
      username: ''
    }
  }
  componentDidMount(){
    var pusher = new Pusher('4aece57e5162943ac969', {
      cluster: 'us2',
      forceTLS: true
    });

    var channel = pusher.subscribe('chat');
    channel.bind('message', (message) => {
      this.setState({messages: [...this.state.messages, message]})
    });
  }
  render(){
    const {loginVisible, messages, messageInput, username} = this.state
    return (
      <div className="App">
        {loginVisible && 
        <LoginModal handleLogin={this.handleLogin}
                    handleUserNameChange={this.handleUserNameChange}
                    username={username}/>}
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
        author: this.state.username,
        body: this.state.messageInput
       }
       axios.post('http://localhost:8080/message', payload)
       this.setState({messageInput: ''})
    } 
  }
  handleLogin = (event) => {
    event.preventDefault()
    this.setState({loginVisible: false})
  }
  handleUserNameChange = (event) => {
    this.setState({username: event.target.value})
  }
}

export default App;
