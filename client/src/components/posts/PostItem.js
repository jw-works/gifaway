import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";

const PostItem = ({
  auth,
  post: { _id, title, body, likes, user, date, name, gif }
}) => {
  if (gif) {
    return (
      <Fragment>
        <div class="card">
          <img src={gif} class="card-img-top" alt="..." />
          <div class="card-body">
            <div className="container p-0 m-0 d-flex flex-row justify-content-between">
              <h5 class="card-title">{title}</h5>
              {!auth.loading && auth.isAuthenticated
                ? user === auth.user._id && (
                    <div>
                      {" "}
                      <i class="fas fa-edit"></i>{" "}
                      <i class="far fa-trash-alt"></i>
                    </div>
                  )
                : null}
            </div>
            <p class="card-text">{body}</p>
            <footer class="blockquote-footer mb-2 text-right">
              <small>
                Posted by <cite title="Source Title">{name}</cite>
              </small>
            </footer>
            <p class="card-text d-flex flex-row justify-content-between">
              <small class="text-muted">
                {likes.length} people felt this post | Posted on{" "}
                <Moment format="DD/MM">{date}</Moment>
              </small>
              <small class="text-muted">
                <i class="far fa-heart"></i>
              </small>
            </p>
          </div>
        </div>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <div class="card">
          <div class="card-body">
            <div className="container p-0 m-0 d-flex flex-row justify-content-between">
              <h5 class="card-title">{title}</h5>
              {!auth.loading && auth.isAuthenticated
                ? user === auth.user._id && (
                    <div>
                      {" "}
                      <i class="fas fa-edit"></i>{" "}
                      <i class="far fa-trash-alt"></i>
                    </div>
                  )
                : null}
            </div>
            <p class="card-text">{body}</p>
            <footer class="blockquote-footer mb-2 text-right">
              <small>
                Posted by <cite title="Source Title">{name}</cite>
              </small>
            </footer>
            <p class="card-text d-flex flex-row justify-content-between">
              <small class="text-muted">
                {likes.length} people felt this post | Posted on{" "}
                <Moment format="DD/MM">{date}</Moment>
              </small>
              <small class="text-muted">
                <i class="far fa-heart"></i>
              </small>
            </p>
          </div>
        </div>
      </Fragment>
    );
  }
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(PostItem);
