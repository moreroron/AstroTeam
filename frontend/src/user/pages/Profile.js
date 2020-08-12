import React, { useState, useEffect, useContext } from "react";
import UserContext from "../../UserContext";
import axios from "axios";
import { Link } from "react-router-dom";

const Profile = (props) => {
  const { profile, updateProfile } = useContext(UserContext);
  const [country, setCountry] = useState("israel");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setCountry(profile.country);
    setUsername(profile.username);
    setEmail(profile.email);
  }, [profile.country, profile.username, profile.email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`/users/${profile._id}`, {
        username: username,
        email: email,
        country: country.charAt(0).toUpperCase() + country.slice(1),
      })
      .then(updateProfile({ ...profile, username: username, email: email, country: country.charAt(0).toUpperCase() + country.slice(1) }))
      .then(props.history.push("/dashboard"));
  };

  return (
    <div className="centered-content">
      <div className="modal-box">
        <h1 className="title">Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Username</label>
            <input onChange={(e) => setUsername(e.target.value)} className="input" type="text" value={username} />
          </div>

          <div className="field">
            <label className="label">Email</label>
            <input onChange={(e) => setEmail(e.target.value)} className="input" type="text" value={email} />
          </div>

          <div className="field">
            <label className="label">Country</label>
            <input onChange={(e) => setCountry(e.target.value)} id="title" className="input" type="text" value={country} />
          </div>

          <div className="field buttons is-right">
            <Link to="/dashboard">
              <button className="button">
                <i className="fas fa-chevron-left m-r-sm"></i>
                Back
              </button>
            </Link>
            <button type="submit" className="button is-link">
              <i className="fas fa-save m-r-sm"></i>
              Submit Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
