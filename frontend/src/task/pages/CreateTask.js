import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../UserContext';

const CreateTask = (props) => {

    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("open");

    const { listId } = props.match.params;
    const { profile } = useContext(UserContext);

    const handleChange = (e) => {
        setStatus(e.target.value);
        console.log(profile);
    }

    const handleSubmit = e => {
        e.preventDefault();
        const newTask = {
            title: title,
            status: status,
            authorId: profile._id
        }
        // adding new task
        axios.post(`http://localhost:3001/lists/${listId}/tasks`, newTask)
            // updating user's tasks with the new task
            .then(
                axios.patch(`http://localhost:3001/users/${profile._id}`,
                    { tasks: [...profile.tasks, newTask] }
                ))
            .then(console.log(profile))
            .then(
                props.history.push('/dashboard'));
    }

    return (
        <div className="centered-content">
            <div className="modal-box">
                <h1 className="title">Create New Task</h1>
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <input onChange={e => setTitle(e.target.value)} id="title" className="input" type="text" placeholder="give the task a name" />
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