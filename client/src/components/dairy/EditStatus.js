import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";
import { withRouter, Link } from "react-router-dom";

const EditSatus = ({
  createProfile,
  history,
  getCurrentProfile,
  profile: { profile }
}) => {
  const [state, setstate] = useState({
    phrase: "",
    bodyCharLeft: 100
  });

  useEffect(() => {
    getCurrentProfile();
    setstate({
      phrase: profile.phrase
    });
  }, [getCurrentProfile, profile.phrase]);

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
          required
          maxLength="100"
        ></textarea>
        <p className="text-center">Characters left: {bodyCharLeft}</p>
        <br />
        <div className="container">
          <button className="btn btn-primary mr-3">Set Status</button>
          <Link className="btn btn-primary" to="/diary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

EditSatus.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditSatus));
