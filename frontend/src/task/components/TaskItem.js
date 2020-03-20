import React from 'react';
import { Link } from 'react-router-dom'
import './TaskItem.scss';
import moment from 'moment';

const TaskItem = (props) => {

    const { task } = props
    let tag;
    let opacity = 1.0;

    if (task.priority === 'high' && task.status !== 'closed') tag = 'is-danger';
    if (task.priority === 'medium' && task.status !== 'closed') tag = 'is-warning';
    if (task.priority === 'low' && task.status !== 'closed') tag = 'is-link is-light';
    if (task.status === 'closed') {
        tag = 'is-success';
        opacity = 0.5;
    }

    return (
        <Link to={`/dashboard/${task._listId}/tasks/${task._id}`}>
            <div className={"task level"} style={{ opacity: opacity }}>
                <div className="level-left">
                    <div className="level-item">
                        <span className={tag + " tag m-r-md"}>{task.status}</span>
                        <span className="">{task.title}</span>

                    </div>
                </div>
                <div className="level-right">

                    <div className="level-item">
                        <div className="has-text-right">
                            <div className="tags has-addons rightside-tags">
                                <span className="tag rightside-tags">{task.team.title}</span>
                                <span className="tag mytag is-white rightside-tags">
                                    <div className="icon p-r-sm">
                                        <i className="far fa-calendar-alt"></i>
                                    </div>
                                    {moment(task.deadline).calendar()}
                                </span>
                            </div>
                            <span className="is-size-7 has-text-grey-light">published {moment(task.date).calendar()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default TaskItem