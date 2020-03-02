import React from 'react';
import { Link } from 'react-router-dom'
import './TaskItem.scss';
import moment from 'moment';

const TaskItem = (props) => {
    const { task } = props

    let tag;
    if (task.status === 'bug') tag = 'is-danger';
    if (task.status === 'open') tag = 'is-dark';
    if (task.status === 'closed') tag = '';

    return (
        <Link to={`/dashboard/${task._listId}/tasks/${task._id}`}>
            <div className="task level">
                <div className="level-left">
                    <div className="level-item">
                        <span className={tag + " tag m-r-md"}>{task.status}</span>
                        {task.title}
                    </div>
                </div>
                <div className="level-right">
                    <div className="level-item">
                        <h3 className="time">{moment(task.date).calendar()}</h3>
                    </div>
                </div>

            </div>
        </Link>
    )
}

export default TaskItem