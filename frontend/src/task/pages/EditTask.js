import React, { Component } from "react";
import UserContext from "../../UserContext";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

class EditTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      currentTeam: {},
      currentStatus: "",
      task: {
        team: { title: "" },
        title: "",
        status: "",
        priority: "",
      },
      teams: [],
    };
  }

  static contextType = UserContext;

  getUserData = () => axios.get(`/users/${this.context.profile._id}`);
  getTaskData = async () => {
    const { listId, taskId } = this.props.match.params;
    const { data } = await axios.get(`/lists/${listId}/tasks/${taskId}`);
    return data;
  };

  async componentDidMount() {
    const [userData, taskData] = await axios.all([this.getUserData(), this.getTaskData()]);
    const teams = await axios.get(`/teams`);
    this.setState({
      user: userData.data[0],
      task: taskData,
      teams: teams.data,
      currentTeam: taskData.team,
      currentStatus: taskData.status,
    });
    console.log(this.state.currentTeam);
  }

  handleSubmit = async (e, listId, taskId) => {
    e.preventDefault();
    // update task
    await axios.patch(`/lists/${listId}/tasks/${taskId}`, {
      title: this.state.task.title,
      status: this.state.task.status,
      priority: this.state.task.priority,
      team: this.state.task.team,
    });
    // update team's task to null if task is closed (so they can take new task)
    if (this.state.task.status === "closed") {
      await axios.patch(`/teams/${this.state.task.team._id}`, {
        task: null,
      });
      // add 1 to user's closedTasksCounter
      this.state.currentTeam.users.forEach(async (userId) => {
        let user = await axios.get(`/users/${userId}`);
        await axios.patch(`/users/${userId}`, {
          closedTasksCounter: user.data.closedTasksCounter + 1,
        });
      });
    } else {
      await axios.patch(`/teams/${this.state.task.team._id}`, {
        task: this.state.task,
      });
    }

    // update current team task to null if team was switched to other
    await axios.patch(`/teams/${this.state.currentTeam._id}`, {
      task: null,
    });
    this.props.history.push("/dashboard");
  };

  handleChange = (e) => {
    this.setState({
      task: { ...this.state.task, title: e.target.value },
    });
  };

  handleStatusChange = (e) => {
    this.setState({
      task: { ...this.state.task, status: e.target.value },
    });
  };

  handlePriorityChange = (e) => {
    this.setState({
      task: { ...this.state.task, priority: e.target.value },
    });
  };

  handleDeleteTask = async (e) => {
    const { task } = this.state;
    await axios.delete(`/lists/${task._listId}/tasks/${task._id}`);
    this.props.history.push("/dashboard");
  };

  handleTeam = (e) => {
    this.setState({
      task: { ...this.state.task, team: JSON.parse(e.target.value) },
    });
  };
  render() {
    const allTeamsOptions = this.state.teams.map((team) => {
      // the team is busy with another task
      return (
        <option disabled={team.task && team._id !== this.state.currentTeam._id} key={team._id} value={JSON.stringify(team)}>
          {team.title}
        </option>
      );
    });

    const title =
      this.state.currentStatus !== "closed" ? (
        <h1 className="title">Edit the task</h1>
      ) : (
          <>
            <h1 className="title">The task is closed</h1>
            <p className="m-b-md">You can only edit non-closed tasks!</p>
          </>
        );

    const closedTaskWarning = this.state.task.status === "closed" && this.state.currentStatus !== "closed" ? "* If you close the task you won't be able to edit it afterwards." : "";

    const { listId, taskId } = this.props.match.params;
    return (
      <div className="centered-content">
        <div className="modal-box">
          {title}
          <form onSubmit={(e) => this.handleSubmit(e, listId, taskId)}>
            <div className="field">
              <div className="label">Title</div>
              <input disabled={this.state.currentStatus === "closed"} onChange={this.handleChange} id="title" className="input" type="text" value={this.state.task.title} />
            </div>
            <div className="field">
              <div className="label">Status</div>
              <div className="select">
                <select disabled={this.state.currentStatus === "closed"} value={this.state.task.status} onChange={this.handleStatusChange}>
                  <option value="open">Open</option>
                  <option value="bug">Bug</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <p className="help">{closedTaskWarning}</p>
            </div>

            <div className="field">
              <div className="label">Priority</div>
              <div className="select">
                <select disabled={this.state.currentStatus === "closed"} value={this.state.task.priority} onChange={this.handlePriorityChange}>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            <div className="field">
              <div className="label">Team</div>
              <div className="select">
                <select disabled={this.state.currentStatus === "closed"} value={JSON.stringify(this.state.task.team)} onChange={this.handleTeam}>
                  {allTeamsOptions}
                </select>
              </div>
            </div>

            <div className="field buttons is-right">
              <Link to="/dashboard">
                <button className="button is-link is-light">
                  <i className="fas fa-chevron-left m-r-sm"></i>
                  Back
                </button>
              </Link>
              <button disabled={this.state.currentStatus === "closed"} type="submit" className="button is-link">
                <i className="fas fa-save m-r-sm"></i>
                Save Changes
              </button>
            </div>
          </form>
          <button onClick={this.handleDeleteTask} className="button is-danger is-outlined">
            Remove
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(EditTask);
