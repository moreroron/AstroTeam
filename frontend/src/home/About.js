import React from "react";
import { NavLink, Route, Redirect } from "react-router-dom";
import "./About.scss";
import Summary from "./components/Summary";
import Statistics from "./components/Statistics";
import Video from "./components/Video";

const About = () => {
  return (
    <>
      <section className="hero is-white">
        <div className="hero-body">
          {/* header */}
          <header className="level">
            <div className="level-item has-text-centered">
              <div>
                <figure className="vector image is-128x128">
                  <img src={require("../assets/vector1.svg")} alt="astro1" />
                </figure>
                <h1 className="title m-t-md">About</h1>
              </div>
            </div>
          </header>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-5 is-offset-1">
              {/* sections */}
              <Redirect exact from="/about" to="/about/summary" />
              <Route path="/about/summary" component={Summary} />
              <Route path="/about/statistics" component={Statistics} />
              <Route path="/about/video" component={Video} />
            </div>
            <div className="column is-3 is-offset-2">
              <aside className="menu">
                <p className="menu-label">Asto-Team</p>
                <ul className="menu-list">
                  <li>
                    <NavLink to="/about/summary" activeClassName="is-active">
                      Summary
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/about/statistics" activeClassName="is-active">
                      Statistics
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/about/video" activeClassName="is-active">
                      Video
                    </NavLink>
                  </li>
                </ul>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
