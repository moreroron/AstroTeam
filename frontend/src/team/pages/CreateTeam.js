import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class CreateTeam extends Component {

    state = {
        users: [],
        selectedUsers: [],
        title: ""
    }

    handleTitle = (e) => {
        this.setState({
            title: e.target.value
        });
    }

    handleSelectUsers = (e) => {
        const options = Array.from(e.target.options).filter(option => option.selected);
        console.log(options);
        options.forEach(option => {
            this.setState({ selectedUsers: [...this.state.selectedUsers, option.value] });
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { data } = await axios.post('http://localhost:3001/teams', { title: this.state.title, users: this.state.selectedUsers });
        this.props.history.push('/dashboard');
    }

    async componentDidMount() {
        const { data } = await axios.get('http://localhost:3001/users');
        this.setState({ users: data });
    }

    render() {

        const allUsersOptions = this.state.users.map(user =>
            <option key={user._id} value={user._id}>{user.username}</option>
        );

        return (
            <div className="centered-content">
                <div className="modal-box">
                    <h1 className="title">Create a team</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="field">
                            <div className="label">Name</div>
                            <input onChange={this.handleTitle} className="input" type="input" placeholder="choose a name" />
                        </div>
                        <div className="field">
                            <div className="label">Add members</div>
                            <div className="select is-multiple">
                                <select multiple size={this.state.users.length} onChange={this.handleSelectUsers} value={this.userSelection}>
                                    {allUsersOptions}
                                </select>
                            </div>
                        </div>
                        <div className="field buttons is-right">
                            <input type="submit" className="button is-link" placeholder="Create Team" />
                            <Link to="/dashboard"><button className="button">Cancel</button></Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}

export default CreateTeam