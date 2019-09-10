import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";
import { withRouter, Link } from "react-router-dom";

const SetStatus = ({ createProfile, history }) => {
  const [state, setstate] = useState({
    phrase: "",
    bodyCharLeft: 100
  });

  const { phrase, bodyCharLeft } = state;

  const onChange = e => {
    const currentLetterCount = e.target.value.length;
    const lettersLeftCount = 100 - currentLetterCount;
    setstate({
      phrase: e.target.value,
      bodyCharLeft: lettersLeftCount
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    createProfile(state, history);
  };

  return (
    <div className="container text-center mt-5 mb-5">
      <form onSubmit={onSubmit}>
        <h1 className="lead mt-5 mb-3">
          <b>Set Status to activate your profile</b>
        </h1>
        <textarea
          name="status"
          id="setStatus"
          cols="35"
          rows="10"
          value={phrase}
          onChange={onChange}
          placeholder="Set your status to a fav quote, excerpt, phrase or anything you like.
          But remember to keep it short!"
          required
          maxLength="100"
        ></textarea>
        <p className="text-center">Characters left: {bodyCharLeft}</p>
        <br />
        <div className="container text-center">
          <button className="btn btn-primary mr-3">Set Status</button>
          <Link className="btn btn-primary" to="/diary">
            Cancel
          </Link>
        </div>
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
