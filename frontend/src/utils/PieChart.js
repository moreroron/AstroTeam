import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

class PieChart extends Component {
    state = {
        users: [],
        countries: [],
        usersFromCounries: []
    }

    async componentDidMount() {
        const { data } = await axios.get('http://localhost:3001/users');
        data.forEach(user => {
            this.setState({ countries: [...this.state.countries, user.country] })
        });
        const countries = [...this.state.countries];
        countries.forEach(country => {
            let countUsersFromEachCountry = 0;
            data.forEach(user => {
                if (user.country === country)
                    countUsersFromEachCountry++
            });
            this.setState({ usersFromCounries: [...this.state.usersFromCounries, countUsersFromEachCountry] })
        });
    }

    render() {
        return (
            <Plot
                data={[{
                    values: [...this.state.usersFromCounries],
                    labels: [...this.state.countries],
                    type: 'pie'
                }]}
                layout={{
                    height: 400,
                    width: 500
                }}
            />
        );
    }
}

export default PieChart