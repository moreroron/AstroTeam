import React, { Component } from 'react';
import UserContext from '../../UserContext'
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

class EditTask extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            task: {
                team: { title: "" },
                title: "",
                status: "",
                priority: ""
            },
            teams: []
        }
    }

    static contextType = UserContext

    getUserData = () => axios.get(`http://localhost:3001/users/${this.context.profile._id}`);
    getTaskData = async () => {
        const { listId, taskId } = this.props.match.params;
        const { data } = await axios.get(`http://localhost:3001/lists/${listId}/tasks/${taskId}`);
        return data;
    };

    async componentDidMount() {
        const [userData, taskData] = await axios.all([this.getUserData(), this.getTaskData()]);
        const teams = await axios.get(`http://localhost:3001/teams`);
        this.setState({
            user: userData.data[0],
            task: taskData,
            teams: teams.data
        });
        console.log(taskData, userData.data[0]);
    };

    handleSubmit = async (e, listId, taskId) => {
        e.preventDefault();
        // checking if set to closed - save closedDate
        let closedDate = null;
        if (this.state.task.status === 'closed') {
            closedDate = new Date();
        }
        // update task
        const { data } = await axios.patch(`http://localhost:3001/lists/${listId}/tasks/${taskId}`, {
            title: this.state.task.title,
            status: this.state.task.status,
            priority: this.state.task.priority,
            closedDate: closedDate
        });
        // update team's task to null if task is closed (so they can take new task)
        if (this.state.task.status === 'closed') {
            const team = await axios.patch(`http://localhost:3001/teams/${this.state.task.team._id}`, {
                task: null
            });
        } else {
            const team = await axios.patch(`http://localhost:3001/teams/${this.state.task.team._id}`, {
                task: this.state.task
            });
        }
        this.props.history.push('/dashboard');
    }

    handleChange = (e) => {
        this.setState({
            task: { ...this.state.task, title: e.target.value }
        });
    }

    handleStatusChange = (e) => {
        this.setState({
            task: { ...this.state.task, status: e.target.value }
        });
    }

    handlePriorityChange = (e) => {
        this.setState({
            task: { ...this.state.task, priority: JSON.parse(e.target.value) }
        });
    }

    handleDeleteTask = async (e) => {
        const { task } = this.state
        const { data } = await axios.delete(`http://localhost:3001/lists/${task._listId}/tasks/${task._id}`);
        this.props.history.push('/dashboard');
    }

    handleTeam = (e) => {
        this.setState({
            task: { ...this.state.task, team: e.target.value }
        });
    }
    render() {

        const allTeamsOptions = this.state.teams.map(team => {
            // the team is busy with another task
            return <option disabled={team.task} key={team._id} value={JSON.stringify(team)}>{team.title}</option>
        }
        );

        const { listId, taskId } = this.props.match.params;
        return (
            <div className="centered-content">
                <div className="modal-box">

                    <h1 className="title">Edit the task</h1>
                    <form onSubmit={e => this.handleSubmit(e, listId, taskId)}>
                        <div className="field">
                            <div className="label">Title</div>
                            <input onChange={this.handleChange} id="title" className="input" type="text" value={this.state.task.title} />
                        </div>
                        <div className="field">
                            <div className="label">Status</div>
                            <div className="select">
                                <select value={this.state.task.status} onChange={this.handleStatusChange}>
                                    <option value="open">Open</option>
                                    <option value="bug">Bug</option>
                                    <option value="closed">Closed</option>
                                </select>
                            </div>
                        </div>

                        <div className="field">
                            <div className="label">Priority</div>
                            <div className="select">
                                <select value={this.state.task.priority} onChange={this.handlePriorityChange}>
                                    <option value="high">High</option>
                                    <option value="medium">Medium</option>
                                    <option value="low">Low</option>
                                </select>
                            </div>
                        </div>

                        <div className="field">
                            <div className="label">Team</div>
                            <div className="select">
                                <select onChange={this.handleTeam}>
                                    <option value="" defaultValue >Choose here</option>
                                    {allTeamsOptions}
                                </select>
                            </div>
                        </div>

                        <div className="field buttons is-right">

                            <Link to="/dashboard">
                                <button className="button">
                                    <i className="fas fa-chevron-left m-r-sm"></i>
                                    Back
                                </button>
                            </Link>
                            <button onClick={this.handleDeleteTask} className="button is-danger is-outlined">Delete</button>
                            <button type="submit" className="button is-link">
                                <i className="fas fa-save m-r-sm"></i>
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        )
    }
}

export default withRouter(EditTask)