import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const NewList = (props) => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (formData) => {
    axios.post("http://localhost:3001/lists", { title: formData.title }).then(props.history.push("/dashboard"));
  };

  return (
    <div className="centered-content">
      <div className="modal-box">
        <h1 className="title">Create a new list</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <input name="title" ref={register({ required: true, minLength: 3 })} id="title" className="input" type="text" placeholder="list name" />
          </div>
          {errors.title && <p className="input-error-message">Title is required & must be 3 characters at least</p>}

          <div className="field buttons is-right">
            <Link to="/dashboard">
              <button className="button is-link is-light">
                <i className="fas fa-chevron-left m-r-sm"></i>
                Back
              </button>
            </Link>
            <button type="submit" className="button is-link">
              <i className="fas fa-plus m-r-sm"></i>
              Add List
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(NewList);
