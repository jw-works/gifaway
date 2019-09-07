import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./Landing.css";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/diary" />;
  }

  return (
    <div>
      <div className="container-fluid Landing d-flex flex-column justify-content-center align-items-center text-center">
        <h1>Gifoetry!</h1>
        <p>Gifs + Thoughts. More Expressive. More Relatable.</p>
        <Link className="btn btn-outline-light" to="/explore">
          Explore
        </Link>
      </div>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
