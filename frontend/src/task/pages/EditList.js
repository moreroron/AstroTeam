import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class EditList extends Component {
    state = {
        title: ""
    }

    componentDidMount() {
        const { listId } = this.props.match.params;
        axios.get(`http://localhost:3001/lists/${listId}`).then(res => {
            this.setState({
                title: res.data[0].title
            })
            console.log(res.data);
        })
    }

    handleSubmit = (e, listId) => {
        e.preventDefault();
        axios.patch(`http://localhost:3001/lists/${listId}`, { title: this.state.title })
            .then(res => {
                console.log(res)
            }, err => {
                console.log(err)
            });
        this.props.history.push('/dashboard');
    }

    handleChange = (e) => {
        console.log(this.state.title);
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleDeleteList = (listId) => {
        axios.delete(`http://localhost:3001/lists/${listId}`).then(console.log('record deleted'));
    }

    render() {

        const { listId } = this.props.match.params;

        return (
            <div className="box">


                <div className="centered-content">
                    <div className="modal-box">
                        <h1 className="title">Edit List</h1>
                        <form onSubmit={(e) => this.handleSubmit(e, listId)}>
                            <div className="field">
                                <input onChange={this.handleChange} id="title" className="input" type="text" placeholder={this.state.title} />
                            </div>

                            <div className="field buttons is-right">
                                <input type="submit" className="button is-link" placeholder="Add" />
                                <button onClick={() => this.handleDeleteList(listId)} className="button is-danger">Delete</button>
                                <button className="button">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(EditList)