import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

class BarChart extends Component {
    state = {
        tasks: [],
        days: Array.from(Array(31), (_, i) => i),
        deadlinesPerDay: []
    }

    async componentDidMount() {
        const { data } = await axios.get('http://localhost:3001/tasks');
        let _deadlinePerDay = Array.from(Array(31), (i) => i = 0);
        const allDeadlinesSorted = data
            .filter(task => new Date(task.deadline).getMonth() === new Date().getMonth())
            .map(task => new Date(task.deadline).getDate())
            .sort();
        console.log(allDeadlinesSorted);

        for (let i = 0; i < 31; i++) {
            for (let j = 0; j < allDeadlinesSorted.length; j++) {
                if (i === allDeadlinesSorted[j]) {
                    console.log(i, allDeadlinesSorted[j]);
                    _deadlinePerDay[i] += 1;
                }
            }
        }

        this.setState({ deadlinesPerDay: [..._deadlinePerDay] });
        console.log(_deadlinePerDay);
    }

    render() {
        return (
            <Plot
                data={[
                    {
                        type: 'scatter',
                        mode: 'lines+markers',
                    },
                    { type: 'bar', x: [...this.state.days], y: [...this.state.deadlinesPerDay] },
                    // y - each eleemnt represents the height of each bar
                ]}
                layout={{ width: 320, height: 240 }}
            />
        );
    }
}

export default BarChart