import React, {useState} from 'react'
import axios from 'axios';
import PropTypes from 'prop-types'
import './ChatRoom.css'

export default function ChatRoom(props){
    const { messages, username } = props
    const [messageInput, setMessageInput] = useState('');
    return (
        <div className='chat-room-wrapper'>
            <div className='chat-room-messages'>
                {messages.map(renderMessage)}
            </div>
            <div className='chat-room-message-input-wrapper'>
                <textarea className='chat-room-message-input'
                        onChange={handleMessageInputChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Message" 
                        value={messageInput} />
            </div>
        </div>
    )
    function renderMessage(message, index){
        const {author, body} = message
        return (
            <div key={index} className='chat-message'>
                <span className='chat-message-author'>{author}</span>
                <p className='chat-message-body'>{body}</p>
            </div>
        )
    }
    function handleMessageInputChange(event){
        setMessageInput(event.target.value)
    }
    function handleKeyPress(event){
        const key = event.key || event.keyCode
        if(key === 'Enter' || key === 13){
            event.preventDefault()
            const payload = {
                author: username,
                body: messageInput
            }
            axios.post('/message', payload)
            setMessageInput('')
        }
    }
}

ChatRoom.propTypes = {
    messages: PropTypes.array,
    username: PropTypes.string
}

ChatRoom.defaultProps = {
    messages: []
}