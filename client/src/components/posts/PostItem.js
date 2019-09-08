import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { likePost, unlikePost, deletePost } from "../../actions/post";

const PostItem = ({
  deletePost,
  likePost,
  unlikePost,
  history,
  auth,
  post: { _id, title, body, likes, user, date, name, gif }
}) => {
  const onClickRedirect = e => {
    e.preventDefault();
    likePost(null, history, false);
  };

  const onClickLike = e => {
    e.preventDefault();
    if (!auth.loading && !auth.isAuthenticated) {
      likePost(_id, history, false);
    } else {
      likePost(_id);
    }
  };

  const onClickUnlike = e => {
    e.preventDefault();
    if (!auth.loading && !auth.isAuthenticated) {
      likePost(_id, history, false);
    } else {
      unlikePost(_id);
    }
  };

  const delete_post = () => {
    deletePost(_id);
    window.location.reload();
  };

  if (gif) {
    return (
      <Fragment>
        <div className="card PostItem">
          <img src={gif} className="card-img-top" alt="..." />
          <div className="card-body">
            <div className="container p-0 m-0 d-flex flex-row justify-content-between">
              <h5 className="card-title">{title}</h5>
              {!auth.loading && auth.isAuthenticated
                ? user === auth.user._id && (
                    <div>
                      {" "}
                      <i className="fas fa-edit"></i>{" "}
                      <i
                        className="far fa-trash-alt"
                        onClick={delete_post}
                        style={{ cursor: "pointer" }}
                      ></i>
                    </div>
                  )
                : null}
            </div>
            <p className="card-text">{body}</p>
            <footer className="blockquote-footer mb-2 text-right">
              <small>
                Posted by <cite title="Source Title">{name}</cite>
              </small>
            </footer>
            <p className="card-text d-flex flex-row justify-content-between">
              <small className="text-muted">
                {likes.length} people felt this post | Posted on{" "}
                <Moment format="DD/MM">{date}</Moment>
              </small>
              <small className="text-muted">
                {!auth.loading && !auth.isAuthenticated ? (
                  <button className="btn btn-light" onClick={onClickRedirect}>
                    <i className="far fa-heart"></i>
                  </button>
                ) : !auth.loading &&
                  auth.isAuthenticated &&
                  likes.filter(like => like.user === auth.user._id).length >
                    0 ? (
                  <button className="btn btn-light" onClick={onClickUnlike}>
                    <i className="fas fa-heart"></i>
                  </button>
                ) : (
                  <button className="btn btn-light" onClick={onClickLike}>
                    <i className="far fa-heart"></i>
                  </button>
                )}
              </small>
            </p>
          </div>
        </div>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <div class="card PostItem">
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
                {!auth.loading && !auth.isAuthenticated ? (
                  <button className="btn btn-light" onClick={onClickRedirect}>
                    <i class="far fa-heart"></i>
                  </button>
                ) : !auth.loading &&
                  auth.isAuthenticated &&
                  likes.filter(like => like.user === auth.user._id).length >
                    0 ? (
                  <button className="btn btn-light" onClick={onClickUnlike}>
                    <i class="fas fa-heart"></i>
                  </button>
                ) : (
                  <button className="btn btn-light" onClick={onClickLike}>
                    <i class="far fa-heart"></i>
                  </button>
                )}
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
  auth: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { likePost, unlikePost, deletePost }
)(withRouter(PostItem));
