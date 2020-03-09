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
                        <span className="has-text-weight-bold">{task.title}</span>

                    </div>
                </div>
                <div className="level-right">

                    <div className="level-item">
                        <div className="has-text-right">
                            <div className="tags has-addons rightside-tags">
                                <span className="tag rightside-tags">{task.team.title}</span>
                                <span className="tag is-white rightside-tags">DL: {moment(task.deadline).calendar()}</span>
                            </div>
                            <span className="is-size-7 has-text-grey-light">{moment(task.date).calendar()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default TaskItem