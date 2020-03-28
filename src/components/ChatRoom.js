import React from 'react'
import './ChatRoom.css'

export default class ChatRoom extends React.Component {
    render (){
        return (
            <div className='chat-room-wrapper'>
                <div className='chat-room-messages'>
                    <div className='chat-message'>
                        <span className='chat-message-author'>Jeremy Renner</span>
                        <p className='chat-message-contents'>I'm a rockstar now...</p>
                    </div>
                </div>
                <div className='chat-room-message-input-wrapper'>
                    <textarea className='chat-room-message-input' placeholder="Message" />
                </div>
            </div>
        )
    }
}