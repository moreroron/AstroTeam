import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../../UserContext";
import moment from "moment";
import Select from "react-select";
import { useForm } from "react-hook-form";

const CreateTask = (props) => {
  const { register, handleSubmit, errors, setValue } = useForm();
  const [teams, setTeams] = useState([]);
  const { listId } = props.match.params;
  const { profile } = useContext(UserContext);

  useEffect(() => {
    register({ name: "priority" }, { required: true });
    axios.get("/teams").then((teamsRes) => setTeams(teamsRes.data));
  }, [register]);

  const onSubmit = async (formData) => {
    await axios.post(`/lists/${listId}/tasks`, {
      author: profile._id,
      title: formData.title,
      status: formData.status,
      priority: formData.priority.value,
      deadline: new Date(formData.deadline),
      team: JSON.parse(formData.team),
    });
    props.history.push("/dashboard");
  };

  const priorityOptions = [
    { value: "low", label: "🟡Low" },
    { value: "medium", label: "🟠 Medium" },
    { value: "high", label: "🔴 High" },
  ];

  const customStyles = {
    container: (provided) => ({
      ...provided,
      width: 150,
    }),
  };

  const handlePriority = (selectedOptions) => {
    console.log(selectedOptions);
    setValue("priority", selectedOptions);
  };

  if (!teams.length)
    return (
      <div className="centered-content">
        <div className="box">
          <p>You have to add at least 1 team before submiting a task!</p>
          <Link to="/teams/create-team">
            <button className="button is-link is-fullwidth m-t-sm">Create Team</button>
          </Link>
        </div>
      </div>
    );

  const allTeamsOptions = teams.map((team) => {
    // the team is busy with another task
    return (
      <option disabled={team.task} key={team._id} value={JSON.stringify(team)}>
        {team.title}
      </option>
    );
  });

  return (
    <div className="centered-content">
      <div className="modal-box">
        <h1 className="title">Create New Task</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <div className="label">
              <span className="has-text-danger"> * </span>Title
            </div>
            <input name="title" ref={register({ required: true, minLength: 3 })} id="title" className="input" type="text" placeholder="give the task a name" />
          </div>
          {errors.title && <p className="input-error-message">Title is required & must be 3 characters at least</p>}

          <div className="field">
            <div className="label">
              <span className="has-text-danger m-b-md"> * </span>Team
            </div>
            <div className="select">
              <select name="team" ref={register({ required: true })}>
                <option value="" defaultValue>
                  Choose here
                </option>
                {allTeamsOptions}
              </select>
            </div>
          </div>
          {errors.team && <p className="input-error-message m-b-md">You must choose an available team</p>}

          <div className="field">
            <div className="label">
              <span className="has-text-danger"> * </span>Deadline
            </div>
            <input name="deadline" ref={register({ required: true, validate: (date) => moment(date).isAfter(new Date()) })} className="input" type="date" />
          </div>
          {errors.deadline && <p className="input-error-message">Date must be after the current date</p>}

          <div className="field">
            <div className="label">
              <span className="has-text-danger"> * </span>Status
            </div>
            <div className="select">
              <select name="status" ref={register}>
                <option value="open">Open</option>
                <option value="bug">Bug</option>
              </select>
            </div>
          </div>

          <div className="field">
            <div className="label">Priority</div>
            <Select onChange={handlePriority} name="priority" options={priorityOptions} styles={customStyles} />
          </div>
          {errors.priority && <p className="input-error-message">You must choose a priority</p>}

          <div className="field buttons is-right">
            <Link to="/dashboard">
              <button className="button is-link is-light">
                <i className="fas fa-chevron-left m-r-sm"></i>
                Back
              </button>
            </Link>
            <button type="submit" className="button is-link">
              <i className="fas fa-plus m-r-sm"></i>
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
