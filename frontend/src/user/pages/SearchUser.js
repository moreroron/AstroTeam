import React, { Component } from "react";
import UserList from "../components/UserList";
import axios from "axios";
import "./User.scss";

class SearchUser extends Component {
  state = {
    users: [],
    teams: [],
    team: {},
    filteredByKeyword: [],
    filteredByTeams: [],
    filteredByCounries: [],
    filteredUsers: [],
    isKeywordEmpty: true,
    isAllCountries: true,
    isAllTeams: true,
  };

  async componentDidMount() {
    const users = await axios.get("http://localhost:3001/users");
    const teams = await axios.get("http://localhost:3001/teams");
    this.setState({
      users: [...users.data],
      filteredUsers: [...users.data],
      teams: [...teams.data],
    });
  }

  handleSearch = (e) => {
    let filteredByKeyword = [];
    let isKeywordEmpty = true;

    // empty search box - return all users
    if (e.target.value === "") {
      filteredByKeyword = [...this.state.users];
      isKeywordEmpty = true;
      // word entered - return users contains the word in their username
    } else {
      filteredByKeyword = this.state.users.filter((user) => user.username.includes(e.target.value));
      isKeywordEmpty = false;
    }

    this.setState(
      {
        filteredByKeyword: filteredByKeyword,
        isKeywordEmpty: isKeywordEmpty,
      },
      () => this.finalCut()
    );
  };

  handleSearchByTeams = (e) => {
    let filteredByTeams = [];
    let isAllTeams = true;

    // 'all' is selected - return all users
    if (e.target.value === "all") {
      filteredByTeams = [...this.state.users];
      isAllTeams = true;
      // team was selected
    } else {
      let filteredUsers = [];
      const teamUsersIds = JSON.parse(e.target.value).users;
      teamUsersIds.forEach((userId) => {
        filteredUsers = this.state.users.filter((user) => user._id === userId);
        filteredByTeams.push(...filteredUsers);
      });
      isAllTeams = false;
    }

    this.setState(
      {
        filteredByTeams: filteredByTeams,
        isAllTeams: isAllTeams,
      },
      () => this.finalCut()
    );
  };

  handleSearchByCountry = (e) => {
    let filteredByCounries = [];
    let isAllCountries = true;

    // 'all' is selected - return all users
    if (e.target.value === "all") {
      filteredByCounries = [...this.state.users];
      isAllCountries = true;
      // country was selected
    } else {
      filteredByCounries = this.state.users.filter((user) => user.country === e.target.value);
      isAllCountries = false;
    }

    this.setState(
      {
        filteredByCounries: filteredByCounries,
        isAllCountries: isAllCountries,
      },
      () => this.finalCut()
    );
  };

  finalCut = () => {
    const finalFilteredUsers = this.state.users.filter((user) => {
      let userByKeyword = this.state.filteredByKeyword.find((u) => u._id === user._id);
      let userByCountry = this.state.filteredByCounries.find((u) => u._id === user._id);
      let userByTeam = this.state.filteredByTeams.find((u) => u._id === user._id);

      let userIdByKeyword = userByKeyword === undefined ? 0 : userByKeyword._id;
      let userIdByCountry = userByCountry === undefined ? 0 : userByCountry._id;
      let userIdByTeam = userByTeam === undefined ? 0 : userByTeam._id;

      // check if the user is in all arrays (match every parameter)
      return (userIdByKeyword === user._id || this.state.isKeywordEmpty) && (userIdByCountry === user._id || this.state.isAllCountries) && (userIdByTeam === user._id || this.state.isAllTeams);
    });
    this.setState({ filteredUsers: finalFilteredUsers });
  };

  render() {
    // country selection
    const usersWithUniqueCountries = [...new Set([...this.state.users.map((user) => user.country)])];
    const countriesOptions = usersWithUniqueCountries.map((country, index) => (
      <option key={index} value={country}>
        {country}
      </option>
    ));
    const allCountriesOption = (
      <option key="1000" value="all">
        All
      </option>
    );
    const allCountriesOptions = [allCountriesOption, ...countriesOptions];

    // team selection
    const teamsOptions = this.state.teams.map((team) => (
      <option key={team._id} value={JSON.stringify(team)}>
        {team.title}
      </option>
    ));
    const AllTeamsOption = (
      <option key="1000" value="all">
        All
      </option>
    );
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
                    <select onChange={this.handleSearchByTeams}>{allTeamsOptions}</select>
                  </div>
                </div>
              </div>
              <div className="column is-narrow">
                <div className="field">
                  <div className="label">By Country</div>
                  <div className="select">
                    <select onChange={this.handleSearchByCountry}>{allCountriesOptions}</select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* filtered users */}
          <UserList users={this.state.filteredUsers} />
        </div>
      </div>
    );
  }
}

export default SearchUser;
