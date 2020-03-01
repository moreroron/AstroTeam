import React, { useState, useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import './NewList.scss';
import axios from 'axios';

const NewList = (props) => {

    const [title, setTitle] = useState('');

    const inputRef = useRef();

    useEffect(() => inputRef.current.focus(), []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/lists", { title: title })
            .then(props.history.push('/dashboard'));
    }

    return (
        <div className="centered-content">
            <div className="modal-box">
                <h1 className="title">Create a new list</h1>
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <input ref={inputRef} onChange={(e) => setTitle(e.target.value)} id="title" className="input" type="text" placeholder="list name" />
                    </div>

                    <div className="field buttons is-right">
                        <input type="submit" className="button is-link" placeholder="Add" />
                        <button className="button">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default withRouter(NewList)