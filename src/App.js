import React from 'react'
import Pusher from 'pusher-js'
import ChatRoom from './components/ChatRoom'
import LoginModal from './components/LoginModal'
import './App.css';

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      loginVisible: true,
      messages: [],
      username: ''
    }
  }
  componentDidMount(){
    const pusher = new Pusher('APP_KEY', {
      cluster: 'us2',
      forceTLS: true
    });
  
    const channel = pusher.subscribe('chat');
    channel.bind('message', (message) => {
      this.setState({messages: [...this.state.messages, message]})
    });
  }
  render(){
    const {loginVisible, messages, username} = this.state
    return (
      <div className="App">
        {loginVisible && 
        <LoginModal handleLogin={this.handleLogin}
                    handleUserNameChange={this.handleUserNameChange}
                    username={username}/>}
        <ChatRoom messages={messages}
                  username={username}/>
      </div>
    );
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
