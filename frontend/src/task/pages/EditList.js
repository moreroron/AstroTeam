import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class EditList extends Component {
    state = {
        title: "",
        tasks: [],
        emptyList: true
    }

    async componentDidMount() {
        const { listId } = this.props.match.params;
        const list = await axios.get(`http://localhost:3001/lists/${listId}`);
        const tasksOfList = await axios.get(`http://localhost:3001/lists/${listId}/tasks`);
        this.setState({
            title: list.data.title,
            tasks: [...tasksOfList.data]
        });
        if (this.state.tasks.length) this.setState({ emptyList: false });
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
        if (this.state.emptyList) {
            axios.delete(`http://localhost:3001/lists/${listId}`).then(console.log('record deleted'));
        }
    }

    render() {

        const boold = !this.state.emptyList ? (<p>You can't delete non empty list. delete tasks first.</p>) : ('');


        const { listId } = this.props.match.params;

        return (



            <div className="centered-content">
                <div className="modal-box">
                    <h1 className="title">Edit List</h1>
                    <form onSubmit={(e) => this.handleSubmit(e, listId)}>
                        <div className="field">
                            <input onChange={this.handleChange} id="title" className="input" type="text" placeholder={this.state.title} />
                        </div>

                        <div className="field">
                            {boold}
                        </div>

                        <div className="field buttons is-right">
                            <input type="submit" className="button is-link" placeholder="Add" />
                            <button disabled={!this.state.emptyList} onClick={() => this.handleDeleteList(listId)} className="button is-danger">Delete</button>
                            <button className="button">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}

export default withRouter(EditList)