import React, { useContext } from 'react';
import UserContext from '../UserContext';
import { Link } from 'react-router-dom';
import './Home.scss';

const Home = () => {
    const { isLoggedIn } = useContext(UserContext);
    const button = isLoggedIn
        ? (<button onClick={() => { window.location.replace('http://localhost:3000/dashboard') }} className="btn-primary">Create New List</button>)
        : (
            <button onClick={() => { window.location.replace('http://localhost:3001/auth/google') }} className="btn-danger">
                <span>Sign up with</span>
                <span className="icon"><i className="fab fa-google"></i></span>
            </button>)

    return (
        <section className="hero tinted-image is-fullheight-with-navbar">
            <div className="hero-body">
                <div className="container has-text-centered">

                    <p className="has-text-white is-size-1 title-secondary">ASTRO-TEAM</p>
                    <p className="p-b-lg has-text-light is-size-5">We help teams collaborate easlly.</p>

                    {button}

                </div>
            </div>
        </section>

    )
}

export default Home