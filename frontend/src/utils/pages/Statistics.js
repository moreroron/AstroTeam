import React from 'react'
import PieChart from '../PieChart'

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
            <div className="box">
                <div className="title">Pie Chart</div>
                <p>Division of countries by users nationality</p>
                <PieChart />
            </div>
        </div>
    </>
    );
}

export default Statistics