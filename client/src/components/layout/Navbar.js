import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const onClick = e => {
    e.preventDefault();
    logout();
    window.location.reload();
  };

  const authLinks = (
    <ul className="navbar-nav ml-auto text-center">
      <li className="nav-item">
        <Link className="nav-link" to="/explore">
          Explore
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/diary">
          My Diary
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="#!" onClick={onClick}>
          Logout
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="navbar-nav ml-auto text-center">
      <li className="nav-item active">
        <Link className="nav-link" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/explore">
          Explore
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          Register
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/about">
          About
        </Link>
      </li>
    </ul>
  );

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light Navbar">
        <Link className="navbar-brand" to="/">
          Gifoetry
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {!loading && (
            <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
          )}
        </div>
      </nav>
    </div>
  );
};

Navbar.propType = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
