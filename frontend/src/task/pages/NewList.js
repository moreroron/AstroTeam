import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './NewList.scss';
import axios from 'axios';

class NewList extends Component {
    state = {
        title: ""
    }

    handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/lists", { title: this.state.title })
            .then(res => {
                console.log(res)
            }, err => {
                console.log(err)
            });
        this.props.history.push('/dashboard');
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
        console.log(this.state);
    }

    render() {

        return (
            <div className="centered-content">
                <div className="modal-box">
                    <h1 className="title">Create a new list</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="field">
                            <input onChange={this.handleChange} id="title" className="input" type="text" placeholder="list name" />
                        </div>

                        <div className="field buttons is-right">
                            <input type="submit" className="button is-link" placeholder="Add" />
                            <button className="button">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(NewList)