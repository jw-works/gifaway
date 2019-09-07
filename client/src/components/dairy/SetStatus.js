import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";
import { withRouter } from "react-router-dom";

const SetStatus = ({ createProfile, history }) => {
  const [state, setstate] = useState({
    phrase: ""
  });

  const { phrase } = state;

  const onChange = e => {
    setstate({
      phrase: e.target.value
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    createProfile(state, history);
  };

  return (
    <div className="container text-center mt-5 mb-5">
      <form onSubmit={onSubmit}>
        <label htmlFor="setStatus" className="lead">
          Set status to your fav quote, excerpt, phrase or anything you like.
          But remember to keep it short!
        </label>
        <br />
        <textarea
          name="status"
          id="setStatus"
          cols="35"
          rows="10"
          value={phrase}
          onChange={onChange}
        ></textarea>
        <br />
        <button className="btn btn-primary">Set Status</button>
      </form>
    </div>
  );
};

SetStatus.propTypes = {
  createProfile: PropTypes.func.isRequired
};

export default connect(
  null,
  { createProfile }
)(withRouter(SetStatus));
