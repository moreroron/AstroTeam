import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.scss';
import UserContext from '../UserContext';
import CreateTeam from '../team/pages/CreateTeam';

const Navbar = () => {

    const { isLoggedIn, profile } = useContext(UserContext);

    const navOnline = isLoggedIn
        ? (
            <>
                <div className="level-item">
                    <Link to='/teams/create-team'>
                        <button className="create-team-button button is-link is-outlined m-r-sm">Create Team</button>
                    </Link>
                </div>
                <div className="level-item">
                    <div className="dropdown is-hoverable is-right">
                        <div className="dropdown-trigger">

                            <div className="level m-l-md is-clickable" aria-haspopup="true" aria-controls="dropdown-menu3">

                                <div className="dropdown-avatar level-left">
                                    <img src={profile.avatar} alt={profile.username} />
                                </div>

                                <div className="level-right m-l-sm">
                                    <span className="dropdown-username">{profile.username}</span>
                                    <div className="icon dropdown-arrow">
                                        <i className="fas fa-chevron-down m-l-sm"></i>
                                    </div>

                                </div>


                            </div>
                        </div>

                        <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                            <div className="dropdown-content m-t-md">
                                <Link to="/profile" className="dropdown-item">
                                    <span className="icon is-medium">
                                        <i className="fas fa-lg fa-user-astronaut"></i>
                                    </span>
                                    <span className="m-l-sm">Profile</span>
                                </Link>
                                <Link to="/users" className="dropdown-item">
                                    <span className="icon is-medium">
                                        <i className="fas fa-lg fa-space-shuttle"></i>
                                    </span>
                                    <span className="m-l-sm">All Members</span>
                                </Link>
                                <hr className="dropdown-divider" />
                                <Link to="" className="dropdown-item">
                                    <button onClick={() => { window.location.replace('http://localhost:3001/auth/logout') }} className="button google-btn">Logout</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )


        : (<button onClick={() => { window.location.replace('http://localhost:3001/auth/google') }} className="button google-btn">Signin with Google+</button>)

    const links = isLoggedIn
        ? (<>
            <NavLink to="/dashboard" className="navbar-item" activeClassName="activeLink">Dashboard</NavLink>
            <NavLink to="/chat" className="navbar-item" activeClassName="activeLink">Chat</NavLink>
            <NavLink to="/map" className="navbar-item" activeClassName="activeLink">Map</NavLink>
            <NavLink to="/twitter" className="navbar-item" activeClassName="activeLink">Social</NavLink>
            <NavLink to="/about" className="navbar-item" activeClassName="activeLink">About</NavLink>
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
                        <div className="level">
                            {navOnline}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar