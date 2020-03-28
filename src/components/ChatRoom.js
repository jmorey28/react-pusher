import React from 'react'
import PropTypes from 'prop-types'
import './ChatRoom.css'

export default class ChatRoom extends React.Component {
    render (){
        const { 
            handleMessageInputChange, 
            handleMessageInputKeyPress, 
            messages,
            messageInput } = this.props
        return (
            <div className='chat-room-wrapper'>
                <div className='chat-room-messages'>
                    {messages.map(this.renderMessage)}
                </div>
                <div className='chat-room-message-input-wrapper'>
                    <textarea className='chat-room-message-input'
                            onChange={handleMessageInputChange}
                            onKeyPress={handleMessageInputKeyPress}
                            placeholder="Message" 
                            value={messageInput} />
                </div>
            </div>
        )
    }
    renderMessage(message){
        const {author, contents} = message
        return (
            <div className='chat-message'>
                <span className='chat-message-author'>{author}</span>
                <p className='chat-message-contents'>{contents}</p>
            </div>
        )
    }
}

ChatRoom.propTypes = {
    handleMessageInputChange: PropTypes.func,
    handleMessageInputKeyPress: PropTypes.func,
    messages: PropTypes.array,
    messageInput: PropTypes.string
}

ChatRoom.defaultProps = {
    handleMessageInputChange: () => {},
    handleMessageInputKeyPress: () => {},
    messages: []
}