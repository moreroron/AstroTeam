import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.scss';

const TaskList = (props) => {

    const { tasks } = props;
    const taskList = !tasks.length ? (<p>Submit new assignments for your team</p>) : (
        tasks.map(task => {
            return (
                <div key={task._id}>
                    <div className="list-menu-item is-active" href="#">
                        <TaskItem task={task} />
                    </div>
                </div>
            )
        })
    )
    return (
        <div>{taskList}</div>
    )
}

export default TaskList