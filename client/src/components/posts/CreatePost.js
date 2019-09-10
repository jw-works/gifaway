import React, { Fragment, useState } from "react";
import GiphySearch from "./GiphySearch";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { createPost } from "../../actions/post";
import PropTypes from "prop-types";
import SetStatus from "../dairy/SetStatus";

const CreatePost = ({ createPost, history, profile: { profile } }) => {
  const [state, setstate] = useState({
    searchGif: false,
    gif: "",
    title: "",
    body: "",
    titleCharLeft: 50,
    bodyCharLeft: 150
  });

  const { searchGif, gif, title, body, titleCharLeft, bodyCharLeft } = state;

  const gifOnChange = e => {
    setstate({
      ...state,
      gif: e.target.value
    });
  };

  const titleOnChange = e => {
    const currentLetterCount = e.target.value.length;
    const lettersLeftCount = 50 - currentLetterCount;
    setstate({
      ...state,
      title: e.target.value,
      titleCharLeft: lettersLeftCount
    });
  };

  const bodyOnChange = e => {
    const currentLetterCount = e.target.value.length;
    const lettersLeftCount = 150 - currentLetterCount;
    setstate({
      ...state,
      body: e.target.value,
      bodyCharLeft: lettersLeftCount
    });
  };

  const onClick = e => {
    e.preventDefault();
    setstate({
      searchGif: true
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (gif) {
      createPost({ gif, title, body }, history);
    } else {
      createPost({ title, body }, history);
    }
  };

  return profile === null ? (
    <SetStatus />
  ) : !searchGif ? (
    <Fragment>
      <div className="container mt-5 mb-5">
        <div className="container text-center mb-5">
          <h1 className="display-4">Create Post</h1>
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
              onChange={gifOnChange}
            />
          </div>
          <small id="gif" className="form-text text-muted mb-3">
            This is optional and you can paste any gif media link.{" "}
            Alternatively, you can also use the Search Gifs button below to
            search for gifs (beta feature).
          </small>
          <div className="container-fluid mb-3 p-0 text-center text-md-left">
            <button className="btn btn-primary" onClick={onClick}>
              Search Gifs
            </button>
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
            <button className="btn btn-primary mr-3">Post</button>
            <Link className="btn btn-primary" to="/diary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </Fragment>
  ) : (
    <GiphySearch />
  );
};

CreatePost.protoTypes = {
  createPost: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { createPost }
)(withRouter(CreatePost));
