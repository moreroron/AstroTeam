import React, { useContext } from 'react';
// import UserContext from '../UserContext';
import './Home.scss';

const Home = (props) => {
    // const value = useContext(UserContext);
    return (
        <section className="hero tinted-image is-fullheight-with-navbar">
            <div className="hero-body">
                <div className="container has-text-centered">

                    <p className="has-text-white is-size-1 title-secondary">ASTRO-TEAM</p>
                    <p className="p-b-lg has-text-light is-size-5">We help teams collaborate easlly.</p>

                    <button className="btn-primary">Create New List</button>

                </div>
            </div>
        </section>

    )
}

export default Home