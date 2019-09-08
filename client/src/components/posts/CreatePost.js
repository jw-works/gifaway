import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import GiphySearch from "./GiphySearch";

const CreatePost = () => {
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

  return !searchGif ? (
    <Fragment>
      <div className="container mt-5 mb-5">
        <div className="container text-center mb-5">
          <h1 className="display-4">Create Post</h1>
        </div>
        <form>
          <div className="form-group">
            <label htmlFor="gif">GIF URL</label>
            <input
              type="email"
              className="form-control"
              id="gif"
              placeholder="Gif media url"
              value={gif}
              name="gif"
              onChange={onChange}
            />
          </div>
          <small id="gif" className="form-text text-muted mb-3">
            You can paste any gif media link.{" "}
            <Link to="/post-help">Click here</Link> for help on how to find gif
            links. Alternatively, you can also use the button below to search
            for gifs (beta feature).
          </small>
          <div className="container-fluid mb-3 p-0 text-center text-md-left">
            <button className="btn btn-primary" onClick={onClick}>
              Search Gifs
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="email"
              className="form-control"
              id="title"
              placeholder="Post Title"
              value={title}
              name="title"
              onChange={onChange}
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

export default CreatePost;
