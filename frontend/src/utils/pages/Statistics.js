import React from 'react'
import PieChart from '../PieChart'
import BarChart from '../BarChart';

const Statistics = () => {
    return (<>
        <section className="hero is-white">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">Statistics</h1>
                </div>
            </div>
        </section>

        <div className="centered-content">
            <section className="section">
                <div className="box">
                    <div className="title">Pie Chart</div>
                    <p>Division of countries by users nationality</p>
                    <PieChart />
                </div>
            </section>

            <section className="section">
                <div className="box">
                    <div className="title">Bar Chart</div>
                    <p>How much tasks with the same deadline per day in 30 days of the current month</p>
                    <BarChart />
                </div>
            </section>
        </div>
    </>
    );
}

export default Statistics