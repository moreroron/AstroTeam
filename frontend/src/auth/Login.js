import React from 'react';
import './Login.scss';

const Login = () => {

    return (
        <div className="centered-content">
            <div className="modal-box">
                <h1 className="title">Login</h1>
                <button onClick={() => { window.location.replace('http://localhost:3001/auth/google') }} className="button google-btn">
                    Google+
                </button>
            </div>
        </div>
    )
}

export default Login