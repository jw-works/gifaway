import React, { Fragment, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { editPost, getPost } from "../../actions/post";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";

const EditPost = ({
  getPost,
  editPost,
  history,
  post: { post },
  match,
  loading
}) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  useEffect(() => {
    if (post.title && post.body && post.gif) {
      setstate({
        title: post.title,
        gif: post.gif,
        body: post.body
      });
    }
  }, [post.gif, post.title, post.body]);

  useEffect(() => {
    if (post.title && post.body && !post.gif) {
      setstate({
        gif: "",
        title: post.title,
        body: post.body
      });
    }
  }, [post.title, post.body, post.gif]);

  const [state, setstate] = useState({
    gif: "",
    title: "",
    body: "",
    titleCharLeft: "",
    bodyCharLeft: ""
  });

  const { title, gif, body, titleCharLeft, bodyCharLeft } = state;

  const onChange = e => {
    setstate({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const titleOnChange = e => {
    let lettersLeftCount = titleCharLeft;
    const currentLetterCount = e.target.value.length;
    lettersLeftCount = 50 - currentLetterCount;
    setstate({
      ...state,
      title: e.target.value,
      titleCharLeft: lettersLeftCount
    });
  };

  const bodyOnChange = e => {
    let lettersLeftCount = bodyCharLeft;
    const currentLetterCount = e.target.value.length;
    lettersLeftCount = 150 - currentLetterCount;
    setstate({
      ...state,
      body: e.target.value,
      bodyCharLeft: lettersLeftCount
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (state.gif) {
      editPost(match.params.id, { title, body, gif }, history);
    } else {
      editPost(match.params.id, { title, body }, history);
    }
  };

  const clearState = e => {
    e.preventDefault();
    setstate({
      searchGif: false,
      gif: "",
      title: "",
      body: ""
    });
    history.push("/diary");
  };

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container mt-5 mb-5">
        <div className="container text-center mb-5">
          <h1 className="display-4">Edit Post</h1>
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="gif">GIF URL</label>
            <input
              type="text"
              className="form-control"
              id="gif"
              placeholder="Gif media url"
              value={gif}
              name="gif"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              placeholder="Post Title"
              value={title}
              name="title"
              onChange={titleOnChange}
              required
              maxLength="50"
            />
            <p className="text-right">Characters left: {titleCharLeft}</p>
          </div>
          <div className="form-group">
            <label htmlFor="body">Body</label>
            <textarea
              className="form-control"
              id="body"
              rows="3"
              placeholder="Post Content"
              value={body}
              name="body"
              onChange={bodyOnChange}
              required
              maxLength="150"
            ></textarea>
            <p className="text-right">Characters left: {bodyCharLeft}</p>
          </div>
          <div className="container-fluid m-0 p-0 text-center text-md-left">
            <button className="btn btn-primary">Save changes</button>
            <button className="btn btn-primary ml-3" onClick={clearState}>
              Go Back
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

EditPost.protoTypes = {
  editPost: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { editPost, getPost }
)(withRouter(EditPost));
