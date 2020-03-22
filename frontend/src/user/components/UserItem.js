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
        <tr>
            <th>
                <figure className="image is-32x32">
                    <img className="is-rounded" src={user.avatar} alt={user.username} />
                </figure>
            </th>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.country}</td>
            <td>{user.closedTasksCounter}</td>
        </tr>
    )
}

export default UserItem

