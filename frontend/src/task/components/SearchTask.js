import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';

const SearchTask = (props) => {

    const [tasks, setTasks] = useState([]);
    const [status, setStatus] = useState("all");
    const [date, setDate] = useState();

    useEffect(() => {
        const reverseOrder = props.tasks.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        })
        setTasks(reverseOrder)
    }, [props.tasks])

    const handleChange = (e) => {
        let filteredTasks = tasks.filter(task => {
            return task.title.startsWith(e.target.value);
        });
        (e.target.value !== '') ? setTasks(filteredTasks) : setTasks(props.tasks);
    }

    const handleStatusChange = (e) => {
        let filteredTasks = props.tasks.filter(task => {
            return task.status === e.target.value
        });
        setStatus(e.target.value);
        setTasks(filteredTasks);
        // all is selected
        if (e.target.value === 'all') setTasks(props.tasks);
    }

    const handleDateChange = (e) => {
        let filteredTasks = tasks.sort((a, b) => {
            if (e.target.value === 'new') return new Date(b.date) - new Date(a.date);
            else if (e.target.value === 'old') return new Date(a.date) - new Date(b.date);
        });
        setDate(e.target.value);
        setTasks(filteredTasks);
    }

    return (
        <>
            <div className="box">
                <div className="columns">
                    <div className="column is-narrow">
                        <div className="field">
                            <label className="label">Search Task</label>
                            <div className="control has-icons-right">
                                <input onChange={handleChange} className="input" type="text" placeholder="find task" />
                                <span className="icon is-right">
                                    <i className="fas fa-search"></i>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="column is-narrow">
                        <label className="label">By Status</label>
                        <div className="select">
                            <select value={status} onChange={handleStatusChange}>
                                <option value="all">ALL</option>
                                <option value="open">OPEN</option>
                                <option value="bug">BUG</option>
                                <option value="closed">CLOSED</option>
                            </select>
                        </div>
                    </div>

                    <div className="column is-narrow">
                        <label className="label">By Date</label>
                        <div className="select">
                            <select value={date} onChange={handleDateChange}>
                                <option value="new">NEW</option>
                                <option value="old">OLD</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>


            <TaskList tasks={tasks} />
        </>
    )
}

export default SearchTask
