import React, { Component } from 'react';
import UserList from '../components/UserList';
import axios from 'axios';
import './User.scss';

class SearchUser extends Component {

    state = {
        users: [],
        filteredUsers: [],
        teams: [],
        team: {}
    }

    async componentDidMount() {
        const users = await axios.get('http://localhost:3001/users');
        const teams = await axios.get('http://localhost:3001/teams')
        this.setState({
            users: [...users.data],
            filteredUsers: [...users.data],
            teams: [...teams.data]
        });
    }

    handleSearch = e => {
        console.log(this.state.filteredUsers);
        const newFilteredUsers = this.state.users.filter(user =>
            user.username.includes(e.target.value)
        );
        this.setState({ filteredUsers: [...newFilteredUsers] });
    }

    handleSearchByTeams = e => {
        // 'All' is selected
        if (e.target.value === 'all') this.setState({ filteredUsers: [...this.state.users] });
        else {
            let teamUsers = [];
            let filteredUsers = [];
            // // all team's users Ids
            const teamUsersIds = JSON.parse(e.target.value).users;
            teamUsersIds.forEach(userId => {
                filteredUsers = this.state.users.filter(user => user._id === userId);
                teamUsers.push(...filteredUsers);
            });
            this.setState({ filteredUsers: [...teamUsers] });
        }
    }

    handleSearchByCountry = e => {
        // 'All' is selected
        if (e.target.value === 'all') this.setState({ filteredUsers: [...this.state.users] });
        else {
            const filteredUsers = this.state.users.filter(user =>
                user.country === e.target.value
            );
            this.setState({ filteredUsers: [...filteredUsers] })
        }
    }

    render() {

        // country selection
        const usersWithUniqueCountries = [...new Set([...this.state.users.map(user => user.country)])];
        const countriesOptions = usersWithUniqueCountries.map((country, index) =>
            <option key={index} value={country}>{country}</option>
        );
        const allCountriesOption = (<option key="1000" value="all">All</option>);
        const allCountriesOptions = [allCountriesOption, ...countriesOptions];

        // team selection
        const teamsOptions = this.state.teams.map(team =>
            <option key={team._id} value={JSON.stringify(team)}>{team.title}</option>
        );
        const AllTeamsOption = (<option key="1000" value="all">All</option>);
        const allTeamsOptions = [AllTeamsOption, ...teamsOptions];


        return (
            <div className="centered-content">
                <div className="user-container">
                    <h1 className="title has-text-link">All Members</h1>
                    <div className="box">
                        <div className="columns">
                            <div className="column is-narrow">
                                <div className="field">
                                    <label className="label">Search Member</label>
                                    <div className="control has-icons-right">
                                        <input onChange={this.handleSearch} className="input" type="text" placeholder="find member" />
                                        <span className="icon is-right">
                                            <i className="fas fa-search"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-narrow">
                                <div className="field">
                                    <div className="label">By Team</div>
                                    <div className="select">
                                        <select onChange={this.handleSearchByTeams}>
                                            {allTeamsOptions}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="column is-narrow">
                                <div className="field">
                                    <div className="label">By Country</div>
                                    <div className="select">
                                        <select onChange={this.handleSearchByCountry}>
                                            {allCountriesOptions}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* filtered users */}
                    <UserList users={this.state.filteredUsers} />

                </div>
            </div>
        )
    }
}

export default SearchUser