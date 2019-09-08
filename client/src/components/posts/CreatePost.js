import React, { Fragment, useState } from "react";
import GiphySearch from "./GiphySearch";
import { connect } from "react-redux";
import { createPost } from "../../actions/post";
import PropTypes from "prop-types";

const CreatePost = ({ createPost }) => {
  const [state, setstate] = useState({
    searchGif: false,
    gif: "",
    title: "",
    body: ""
  });

  const { searchGif, gif, title, body } = state;

  const onChange = e => {
    e.preventDefault();
    setstate({
      ...state,
      [e.target.name]: e.target.value
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
      createPost({ gif, title, body });
    }
    createPost({ title, body });
  };

  return !searchGif ? (
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
              onChange={onChange}
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
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="body">Body</label>
            <textarea
              className="form-control"
              id="body"
              rows="3"
              value={body}
              name="body"
              onChange={onChange}
              required
            ></textarea>
          </div>
          <div className="container-fluid m-0 p-0 text-center text-md-left">
            <button className="btn btn-primary">Post</button>
          </div>
        </form>
      </div>
    </Fragment>
  ) : (
    <GiphySearch />
  );
};

CreatePost.protoTypes = {
  createPost: PropTypes.func.isRequired
};

export default connect(
  null,
  { createPost }
)(CreatePost);
