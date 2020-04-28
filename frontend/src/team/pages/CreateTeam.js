import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useForm } from "react-hook-form";

const CreateTeam = (props) => {
  const [users, setUsers] = useState([]);
  const { register, handleSubmit, errors, setValue } = useForm();

  useEffect(() => {
    axios.get("http://localhost:3001/users").then((users) => setUsers(users.data));
    register({ name: "members" }, { required: true, validate: (members) => members });
  }, []);

  const onSubmit = async (formData) => {
    console.log(formData);
    const members = formData.members.map((member) => member.value);
    const { teams } = await axios.post("http://localhost:3001/teams", {
      title: formData.title,
      users: members,
    });
    props.history.push("/dashboard");
  };

  const handleMembers = (members) => {
    setValue("members", members);
  };

  const allUsersOptions = users.map((user) => {
    return { value: user._id, label: user.username };
  });

  return (
    <div className="centered-content">
      <div className="modal-box">
        <h1 className="title">Create a team</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <div className="label">
              <span className="has-text-danger"> * </span>Team's Name
            </div>
            <input name="title" ref={register({ required: true, minLength: 1 })} className="input" type="input" placeholder="choose a name" />
          </div>
          {errors.title && <p className="input-error-message">Team's name is required & must be at least 1 character long</p>}

          <div className="field">
            <div className="label">
              <span className="has-text-danger"> * </span>Members
            </div>
            <Select name="members" onChange={handleMembers} components={makeAnimated()} options={allUsersOptions} isSearchable isMulti closeMenuOnSelect={false} />
          </div>
          {errors.members && <p className="input-error-message">You must select at least 1 member</p>}

          <div className="field buttons is-right">
            <Link to="/dashboard">
              <button className="button">
                <i className="fas fa-chevron-left m-r-sm"></i>
                Back
              </button>
            </Link>
            <button type="submit" className="button is-link">
              <i className="fas fa-users m-r-sm"></i>
              Add Team
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTeam;
