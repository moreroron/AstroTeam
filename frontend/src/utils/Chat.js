import React, { useEffect, useState, useRef, useContext } from 'react'
import UserContext from '../UserContext';
import socketIOCLient from 'socket.io-client';
import './Chat.scss';

const Chat = () => {

    const { profile } = useContext(UserContext);
    const socketRef = useRef();
    const messageInputRef = useRef();
    const [typing, setTyping] = useState("");
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);

    useEffect(() => {
        socketRef.current = socketIOCLient('http://localhost:3001');
        socketRef.current.on('chat', data => {
            setTyping('');
            setChat(chat => [...chat, {
                message: data.message,
                handler: data.handler
            }]);
        });

        socketRef.current.on('typing', data => {
            setTyping(data);
        });

    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        socketRef.current.emit('chat', {
            message: message,
            handler: profile.username
        });
        messageInputRef.current.value = "";
        messageInputRef.current.focus();
    }

    const handleChange = (e) => {
        const message = e.target.value;
        setMessage(message);
        // the input value isn't empty -> send broadcast message
        if (message) socketRef.current.emit('typing', profile.username);
    }

    const allMessages = chat.map((message, index) =>
        <div key={index}>
            <p><strong>{message.handler}: </strong>{message.message}</p>
        </div>
    )

    const someOneTyping = typing ? <p><em>{typing} is typing a message...</em></p> : "";

    return (

        <div className="centered-content">
            <div className="modal-box">
                <h1 className="title">Chat Room</h1>
                <div id="chat-room">
                    <div id="chat-window">
                        <div id="output">
                            {allMessages}
                        </div>
                        <div id="feedback">
                            {someOneTyping}
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input className="chat-input" onChange={handleChange} ref={messageInputRef} id="message" type="text" placeholder="Message" />
                        <button className="send-btn" type="submit" id="send">Send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Chat