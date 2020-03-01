import React, { useState, useEffect } from 'react';
import UserList from '../components/UserList';
import axios from 'axios';
import './User.scss';

const Users = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/users').then(res => {
            setUsers(res.data);
        });
    }, [])

    return (
        <div className="centered-content">
            <div className="user-container">
                <h1 className="title has-text-link">Your Team</h1>
                <div className="box">
                    <div className="columns">
                        <div className="column is-narrow">
                            <div className="field">
                                <label className="label">Search teamate</label>
                                <div className="control has-icons-right">
                                    <input className="input" type="text" placeholder="find teamate" />
                                    <span className="icon is-right">
                                        <i className="fas fa-search"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* filtered users */}
                <UserList users={users} />

            </div>
        </div>
    )
}

export default Users