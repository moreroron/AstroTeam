import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.scss';
import UserContext from '../UserContext';

const Navbar = () => {

    const { isLoggedIn, profile } = useContext(UserContext);

    const navOnline = isLoggedIn
        ? (
            <div className="dropdown is-hoverable is-right">
                <div className="dropdown-trigger">
                    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu3">
                        <span className="icon is-large">
                            <i className="fas fa-user-astronaut"></i>
                        </span>
                        <span>{profile.username}</span>

                    </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                    <div className="dropdown-content">
                        <Link to="/profile" className="dropdown-item">
                            <span className="icon is-medium">
                                <i className="fas fa-lg fa-user-astronaut"></i>
                            </span>
                            Profile
                        </Link>
                        <Link to="/users" className="dropdown-item">
                            <span className="icon is-medium m-r-2">
                                <i className="fas fa-lg fa-space-shuttle"></i>
                            </span>
                            Your Team
                        </Link>
                        <hr className="dropdown-divider" />
                        <Link to="" className="dropdown-item">
                            <button onClick={() => { window.location.replace('http://localhost:3001/auth/logout') }} className="button google-btn">Logout</button>
                        </Link>
                    </div>
                </div>
            </div>
        )


        : (<button onClick={() => { window.location.replace('http://localhost:3001/auth/google') }} className="button google-btn">Signin with Google+</button>)

    const links = isLoggedIn
        ? (<>
            <NavLink to="/dashboard" className="navbar-item" activeClassName="activeLink">Dashboard</NavLink>
            <NavLink to="/chat" className="navbar-item" activeClassName="activeLink">Chat</NavLink>
            <NavLink to="/map" className="navbar-item" activeClassName="activeLink">Map</NavLink>
            <NavLink to="/twitter" className="navbar-item" activeClassName="activeLink">Social</NavLink>
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
                    </div>
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