import React, { useState, useContext, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../../UserContext';
import moment from 'moment';
import { Calendar } from 'react-date-range';

const CreateTask = (props) => {

    const inputRef = useRef();
    const deadlineErrorRef = useRef();

    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("open");
    const [deadline, setDeadline] = useState();
    const [teams, setTeams] = useState([]);
    const [team, setTeam] = useState({});

    const { listId } = props.match.params;
    const { profile, updateProfile } = useContext(UserContext);

    useEffect(() => {
        axios.get('http://localhost:3001/teams').then(res => {
            const teams = res.data;
            console.log(teams);

            // teams.filter(team => {
            //     return Object.keys(team.task).length;
            // });
            setTeams(res.data);
            if (res.data.length) {
                setTeam(res.data[0]);
                inputRef.current.focus();
            }
        })

    }, []);

    const handleDate = (e) => {
        setDeadline(e.target.value);
        const validation = moment(e.target.value).isBefore(new Date());
        validation ? deadlineErrorRef.current = "You can't choose a date already passed" : deadlineErrorRef.current = "";
    }

    const handleTeam = (e) => {
        setTeam(JSON.parse(e.target.value));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!deadlineErrorRef.current) {
            const { data } = await axios.post(`http://localhost:3001/lists/${listId}/tasks`, {
                author: profile._id,
                title: title,
                status: status,
                deadline: deadline,
                team: team
            });
            props.history.push('/dashboard');
        }
    }

    if (!teams.length) return (
        <div className="centered-content">
            <div className="box">
                <p>You have to add at least 1 team before submiting a task!</p>
                <Link to="/teams/create-team"><button className="button is-link is-fullwidth m-t-sm">Create Team</button></Link>
            </div>
        </div>
    )

    const allTeamsOptions = teams.map(team =>
        <option key={team._id} value={JSON.stringify(team)}>{team.title}</option>
    );

    return (
        <div className="centered-content">
            <div className="modal-box">
                <h1 className="title">Create New Task</h1>
                <p className="has-text-danger m-b-sm">{deadlineErrorRef.current}</p>
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <div className="label">Title</div>
                        <input onChange={(e) => setTitle(e.target.value)} ref={inputRef} id="title" className="input" type="text" placeholder="give the task a name" />
                    </div>
                    <div className="field">
                        <div className="label">Team</div>
                        <div className="select">
                            <select onChange={handleTeam}>
                                {allTeamsOptions}
                            </select>
                        </div>
                    </div>
                    <div className="field">
                        <div className="label">Deadline</div>
                        {/* <Calendar onChange={handleDate}
                            date={null} /> */}
                        <input onChange={handleDate} className="input" type="date" />

                    </div>
                    <div className="label">Status</div>
                    <div className="select">
                        <select onChange={(e) => setStatus(e.target.value)} value={status}>
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