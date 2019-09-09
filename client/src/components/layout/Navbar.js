import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
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
        <NavLink className="nav-link" exact to="/explore">
          Explore
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" exact to="/diary">
          My Diary
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" exact to="/create-post">
          Create Post
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" exact to="#!" onClick={onClick}>
          Logout
        </NavLink>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className="navbar-nav ml-auto text-center">
      <li className="nav-item">
        <NavLink className="nav-link" exact to="/">
          Home
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" exact to="/explore">
          Explore
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" exact to="/login">
          Login
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" exact to="/register">
          Register
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" exact to="/about">
          About
        </NavLink>
      </li>
    </ul>
  );

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light Navbar">
        <Link className="navbar-brand" to="/">
          Gifaway
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
        <div
          className="collapse navbar-collapse"
          id="navbarNav"
          data-toggle="collapse"
          data-target="#navbarNav.show"
        >
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
