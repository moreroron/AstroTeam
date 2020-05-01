import React, { useState } from "react";
import PieChart from "../../utils/PieChart";
import BarChart from "../../utils/BarChart";
import { NavLink, Route, Redirect } from "react-router-dom";

const Statistics = () => {
  const [tabs, setTabs] = useState({
    left: "is-active",
    right: "",
  });

  // let toggleLeftLink = "is-active";
  // let toggleRightLink = "";

  const toggleTabs = (event) => {
    const selectedTab = event.currentTarget.dataset.type;
    selectedTab === "left" ? setTabs({ left: "is-active", right: "" }) : setTabs({ left: "", right: "is-active" });
  };

  return (
    <>
      <p className="is-size-3 title-secondary">STATISTICS</p>
      <p className="is-size-4">Welcome to the statistic page. Here, you can observe the activity of your teams.</p>

      <section className="section">
        <div className="tabs is-centered is-boxed">
          <ul>
            <li className={tabs.left} data-type="left" onClick={(e) => toggleTabs(e)}>
              <NavLink to="/about/statistics/pie-chart">
                <span className="icon is-small">
                  <i className="fas fa-globe-americas" aria-hidden="true"></i>
                </span>
                <span>Distribution by countries</span>
              </NavLink>
            </li>

            <li className={tabs.right} data-type="right" onClick={(e) => toggleTabs(e)}>
              <NavLink to="/about/statistics/bar-chart">
                <span className="icon is-small">
                  <i className="far fa-calendar-alt" aria-hidden="true"></i>
                </span>
                <span>Deadlines spreaded in month</span>
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
