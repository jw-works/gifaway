import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import "./Diary.css";

const Dairy = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <div>
      <div className="container text-center mt-5 Diary">
        <div className="displayname text-center">
          <h1 className="display-1">@{user && user.username}</h1>
          {profile !== null ? (
            <p className="mt-3">
              {profile.phrase} <br />
              <Link className="btn btn-primary m-2" to="/edit-status">
                Edit Status
              </Link>
              <Link className="btn btn-primary m-2" to="/create-post">
                Create Post
              </Link>
            </p>
          ) : (
            <div>
              <p>
                You do not have a status. <br />
                <Link className="btn btn-primary m-2" to="/create-post">
                  Set Status
                </Link>
                <Link className="btn btn-primary m-2" to="/create-post">
                  Create Post
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

Dairy.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dairy);
