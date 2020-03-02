import React, { useState, useContext, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../UserContext';

const CreateTask = (props) => {

    const inputRef = useRef();

    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("open");

    const { listId } = props.match.params;
    const { profile, updateProfile } = useContext(UserContext);

    useEffect(() => inputRef.current.focus(), []);

    const handleChange = (e) => {
        setStatus(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await axios.post(`http://localhost:3001/lists/${listId}/tasks`, {
            author: profile._id,
            title: title,
            status: status,
        });
        console.log(profile._id);
        props.history.push('/dashboard');
    }

    return (
        <div className="centered-content">
            <div className="modal-box">
                <h1 className="title">Create New Task</h1>
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <input ref={inputRef} onChange={e => setTitle(e.target.value)} id="title" className="input" type="text" placeholder="give the task a name" />
                    </div>
                    <div className="select">
                        <select value={status} onChange={handleChange}>
                            <option value="open">Open</option>
                            <option value="bug">Bug</option>
                        </select>
                    </div>


                    <div className="field buttons is-right">
                        <input type="submit" className="button is-link" placeholder="Add Task" />
                        <Link to="/dashboard"><button className="button">Cancel</button></Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateTask