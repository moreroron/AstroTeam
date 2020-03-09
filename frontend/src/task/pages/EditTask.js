import React, { Component } from 'react';
import UserContext from '../../UserContext'
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

class EditTask extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {},
            task: { team: { title: "" } }
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
        this.setState({
            user: userData.data[0],
            task: taskData
        });
        console.log(taskData, userData.data[0]);
    };

    handleSubmit = async (e, listId, taskId) => {
        e.preventDefault();
        // update task
        const { data } = await axios.patch(`http://localhost:3001/lists/${listId}/tasks/${taskId}`, {
            title: this.state.task.title,
            status: this.state.task.status
        });
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

    handleDeleteTask = async (e) => {
        const { task } = this.state
        const { data } = await axios.delete(`http://localhost:3001/lists/${task._listId}/tasks/${task._id}`);
        this.props.history.push('/dashboard');
    }

    render() {
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
                            <div className="label">Team</div>
                            <input className="input" type="text" disabled value={this.state.task.team.title} />
                        </div>
                        <div className="field buttons is-right">
                            <input type="submit" className="button is-link" placeholder="Add" />
                            <button onClick={this.handleDeleteTask} className="button is-danger">Delete</button>
                            <Link to="/dashboard"><button className="button">Cancel</button></Link>
                        </div>
                    </form>
                </div>

            </div>
        )
    }
}

export default withRouter(EditTask)