import React, { useState, useEffect, useContext } from 'react'
import UserContext from '../../UserContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Profile = (props) => {

    const { profile, updateProfile } = useContext(UserContext);
    const [country, setCountry] = useState("israel");

    useEffect(() => {
        setCountry(profile.country);
    }, [profile.country]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:3001/users/${profile._id}`, { country: country })
            .then(updateProfile({ ...profile, country: country }))
            .then(props.history.push('/dashboard'));
    }

    return (

        <div className="centered-content">
            <div className="modal-box">
                <h1 className="title">Profile</h1>
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label className="label">Username</label>
                        <input className="input" type="text" value={profile.username} disabled />
                    </div>

                    <div className="field">
                        <label className="label">Email</label>
                        <input className="input" type="text" value={profile.email} disabled />
                    </div>

                    <div className="field">
                        <label className="label">Country</label>
                        <input onChange={e => setCountry(e.target.value)} id="title" className="input" type="text" value={country} />
                    </div>

                    <div className="field buttons is-right">
                        <input type="submit" className="button is-link" value="Submit Changes" />
                        <Link to="/dashboard"><button className="button">Cancel</button></Link>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Profile