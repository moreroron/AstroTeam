import React, { useEffect, useState } from 'react'
import axios from 'axios';

const UserItem = (props) => {
    const { user } = props;

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        getTasks();
    }, [])

    const getTasks = async () => {
        const { data } = await axios.get(`http://localhost:3001/users/${user._id}/tasks`);
        setTasks(data);
    }

    return (

        <div className="box m-b-sm">
            <div className="level">
                <div className="level-left">
                    <div className="level-item">
                        <div>
                            <p className="title is-6">{user.username}</p>
                            <p className="is-6">{user.email}</p>
                            <p className="is-6">{user.country}</p>
                        </div>

                    </div>
                </div>
                <div className="level-right">
                    <div className="level-item">
                        <p className="">Tasks Opened: {tasks.length}</p>
                    </div>
                </div>
            </div>
        </div>



    )
}

export default UserItem

