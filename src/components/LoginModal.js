import React from 'react'
import PropTypes from 'prop-types'
import './LoginModal.css'

export default function LoginModal (props) {
    const { handleLogin, handleUserNameChange, username } = props
    return(
        <div className='login-modal-wrapper'>
            <div className='login-modal'>
                <h1 className='login-header'>Login</h1>
                <form onSubmit={handleLogin} className='login-form'>
                    <input className='login-username'
                        onChange={handleUserNameChange}
                        placeholder="Username"
                        type='text'
                        value={username}/>
                    <button className='login-button' 
                            type='submit'>
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

LoginModal.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    handleUserNameChange: PropTypes.func.isRequired,
    username: PropTypes.string
}