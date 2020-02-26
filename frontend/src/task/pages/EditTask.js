import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

class EditTask extends Component {
    state = {
        title: "",
        listId: "",
        taskId: "",
        status: ""
    }

    componentDidMount() {
        const { listId, taskId } = this.props.match.params;

        axios.get(`http://localhost:3001/lists/${listId}/tasks/${taskId}`).then(res => {
            this.setState({
                title: res.data.title,
                listId: listId,
                taskId: taskId,
                status: res.data.status
            })
        })
    }

    handleSubmit = (e, listId, taskId) => {
        e.preventDefault();
        axios.patch(`http://localhost:3001/lists/${listId}/tasks/${taskId}`,
            {
                title: this.state.title,
                status: this.state.status
            })
            .then(res => { }, err => {
                console.log(err)
            });
        this.props.history.push('/dashboard');
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleStatusChange = (e) => {
        this.setState({
            status: e.target.value
        })
    }

    handleDeleteTask = e => {
        axios.delete(`http://localhost:3001/lists/${this.state.listId}/tasks/${this.state.taskId}`)
            .then(res => {
                console.log("task deleted");
            })
    }

    render() {

        const { listId, taskId } = this.props.match.params;

        return (

            <div className="centered-content">

                <div className="modal-box">

                    <h1 className="title">Edit the task</h1>
                    <form onSubmit={e => this.handleSubmit(e, listId, taskId)}>
                        <div className="field">
                            <input onChange={this.handleChange} id="title" className="input" type="text" value={this.state.title} />
                        </div>
                        <div className="select">
                            <select value={this.state.status} onChange={this.handleStatusChange}>
                                <option value="open">Open</option>
                                <option value="bug">Bug</option>
                                <option value="closed">Closed</option>
                            </select>
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