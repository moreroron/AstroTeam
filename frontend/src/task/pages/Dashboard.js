import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import TaskList from '../components/TaskList';
import NewList from './NewList';
import './Dashboard.scss';
import axios from 'axios';
import SearchTask from '../components/SearchTask';

class Dashboard extends Component {

    state = {
        lists: [],
        tasks: [],
        currentListId: null,
        currentUser: null,
    }


    componentDidMount() {
        axios.get("http://localhost:3001/lists").then(res => {
            this.setState({
                lists: res.data,
            });
            // default 1st list with its tasks
            if (this.state.lists.length) {
                this.handleList(this.state.lists[0]._id);
            }
        });
    }

    handleList = (listId) => {
        axios.get(`http://localhost:3001/lists/${listId}/tasks`).then(res => {
            this.setState({
                tasks: res.data,
                currentListId: listId
            });
        });
    }

    handleUser = () => {
        axios.get('localhost:3000/dashboard', (req, res) => {
            console.log(req.session);
        });
    }

    render() {

        // this.handleUser();

        const { lists, tasks } = this.state;

        const listLists = !lists.length ? (<div>No lists added</div>) : (
            lists.map(list => {
                let active = (list._id === this.state.currentListId) ? "active" : "";

                return (
                    <div onClick={() => this.handleList(list._id)} className={active + " list-menu-item"} key={list._id}>
                        <NavLink to={`dashboard/${list._id}`}>
                            <p className={active}>{list.title}</p>
                        </NavLink>
                    </div>
                )
            })
        )

        return (
            <div className="centered-content">
                <div className="task-manager-container">

                    {/* leftside - name of lists */}
                    <div className="sidebar has-background-white">
                        <h1 className="title has-text-link">Lists ({lists.length})</h1>
                        <div className="list-menu">{listLists}</div>
                        <Link to="/new-list">
                            <button className="button is-link has-text-white">+ New List</button>
                        </Link>


                    </div>

                    {/* rightside - list with all its tasks */}
                    <div className="tasks-list-container">
                        <div className="level">
                            <div className="level-left">
                                <div className="level-item">
                                    <h1 className="title has-text-link">Scheduling ({this.state.tasks.length})</h1>
                                </div>
                            </div>
                            <div className="level-right">

                                {/* add new task */}
                                <div className="level-item">
                                    {this.state.lists.length
                                        ? (
                                            <>
                                                <div className="level-item">
                                                    <Link to={`/create-task/${this.state.currentListId}`}>
                                                        <button className="button add-task-btn"><i className="fas fa-plus m-r-sm"></i>Add Task</button>
                                                    </Link>
                                                </div>
                                                <div className="level-item">
                                                    <Link to={`/edit-list/${this.state.currentListId}`}>
                                                        <button className="button"><i className="fas fa-wrench m-r-sm"></i>Edit List</button>
                                                    </Link>
                                                </div>
                                            </>
                                        )
                                        : (<>

                                        </>)
                                    }

                                </div>
                            </div>
                        </div>

                        <SearchTask tasks={this.state.tasks} listId={this.state.currentListId} />

                    </div>

                </div>
            </div>
        )
    }
}

export default Dashboard