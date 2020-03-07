import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import moment from 'moment';

// date picker
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';

const SearchTask = (props) => {

    const [tasks, setTasks] = useState([]);
    const [status, setStatus] = useState("all");
    const [date, setDate] = useState();
    const [calToggle, setCalToggle] = useState("");
    const [cal, setCal] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection',
        }
    ]);

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

    const handleCal = (item) => {
        setCal([item.selection]);
        const start = item.selection.startDate;
        const end = item.selection.endDate;
        const filteredTasks = props.tasks.filter(task => {
            return moment(task.deadline).isBetween(start, end);
        });
        setTasks([...filteredTasks]);
    }

    const handleCalToggle = () => {
        if (!calToggle) setCalToggle("is-active");
        else setCalToggle("");
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

                    <div className="column is-narrow">
                        <label className="label">By Deadline</label>
                        <div className={calToggle + " dropdown is-right"}>
                            <div className="dropdown-trigger">
                                <button onClick={handleCalToggle} className="button" aria-haspopup="true" aria-controls="dropdown-menu6">
                                    <span>Pick Dates</span>
                                    <span className="icon is-small">
                                        <i className="fas fa-angle-down" aria-hidden="true"></i>
                                    </span>
                                </button>
                            </div>
                            <div className="dropdown-menu" id="dropdown-menu6" role="menu">
                                <div className="dropdown-content">
                                    <div className="dropdown-item">
                                        <DateRange
                                            editableDateInputs={false}
                                            onChange={handleCal}
                                            moveRangeOnFirstSelection={false}
                                            ranges={cal}
                                            minDate={new Date()}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <TaskList tasks={tasks} />
        </>
    )
}

export default SearchTask
