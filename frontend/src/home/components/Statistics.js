import React from "react";
import PieChart from "../../utils/PieChart";
import BarChart from "../../utils/BarChart";
import { NavLink, Route, Redirect } from "react-router-dom";

const Statistics = () => {
  return (
    <>
      <p className="is-size-3 title-secondary">STATISTICS</p>
      <p className="is-size-4">Welcome to the statistic page. Here, you can observe the activity of your teams.</p>

      <section className="section">
        <div className="tabs is-centered is-boxed">
          <ul>
            <li className="">
              <NavLink to="/about/statistics/pie-chart">
                <span className="icon is-small">
                  <i className="fas fa-film" aria-hidden="true"></i>
                </span>
                <span>Distribution by countries</span>
              </NavLink>
            </li>
            <li className="">
              <NavLink to="/about/statistics/bar-chart">
                <span className="icon is-small">
                  <i className="fas fa-film" aria-hidden="true"></i>
                </span>
                <span>Tasks created for current month</span>
              </NavLink>
            </li>
          </ul>
        </div>

        <Redirect exact from="/statistics/pie-chart" to="/about/statistics/pie-chart" />
        <Route path="/about/statistics/pie-chart" component={PieChart} />
        <Route path="/about/statistics/bar-chart" component={BarChart} />
      </section>
    </>
  );
};

export default Statistics;
