import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import UserContext from '../UserContext';

const Navbar = () => {

    const { isLoggedIn, profile } = useContext(UserContext);

    const navOnline = isLoggedIn
        ? (<button onClick={() => { window.location.replace('http://localhost:3001/auth/logout') }} className="button google-btn">Logout</button>)
        : (<button onClick={() => { window.location.replace('http://localhost:3001/auth/google') }} className="button google-btn">Signin with Google+</button>)

    const links = isLoggedIn
        ? (<><Link to="/" className="navbar-item">Home</Link>
            <Link to="/dashboard" className="navbar-item">Dashboard</Link>
            <Link to="/chat" className="navbar-item">Chat</Link>
            <Link to="/map" className="navbar-item">Map</Link>
        </>)
        : (<p className="navbar-note">The goodies doesn't come for free, <strong>Sign In</strong> first</p>)

    return (
        <nav className="navbar is-fullheight-with-navbar" role="navigation" aria-label="main navigation">
            <div className="container navbar-menu">
                <div className="navbar-start">
                    <Link to="/" className="navbar-item m-r-lg"><i className="fas fa-user-astronaut logo"></i></Link>
                    {links}
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            {navOnline}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar