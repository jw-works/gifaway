import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { getGifs } from "../../actions/giphy";
import { createPost } from "../../actions/post";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";

const GiphySearch = ({
  giphy: { giphyResults },
  getGifs,
  createPost,
  history
}) => {
  const [state, setstate] = useState({
    showGifs: true,
    searchTerm: "",
    gif: "",
    title: "",
    body: "",
    titleCharLeft: 50,
    bodyCharLeft: 150
  });

  const {
    showGifs,
    searchTerm,
    title,
    body,
    gif,
    titleCharLeft,
    bodyCharLeft
  } = state;

  const onChange = e => {
    setstate({
      ...state,
      [e.target.name]: e.target.value
    });
  };

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
    if (searchTerm !== "") {
      getGifs(searchTerm);
    }
    setstate({
      ...state,
      showGifs: true,
      gif: "",
      searchTerm: ""
    });
  };

  const selectGif = (e, gif) => {
    e.preventDefault();
    setstate({
      ...state,
      showGifs: false,
      gif
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    createPost({ gif, title, body }, history);
  };

  return (
    <Fragment>
      <div className="container mt-5 mb-5">
        <div className="container text-center mb-5">
          <h1 className="display-4">Create Post</h1>
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="searchTerm">Search</label>
            <input
              type="text"
              className="form-control"
              id="searchTerm"
              placeholder="Search gif"
              value={searchTerm}
              name="searchTerm"
              onChange={onChange}
            />
          </div>
          <div className="container-fluid mb-3 p-0 text-center text-md-left">
            <button className="btn btn-primary" onClick={onClick}>
              Search
            </button>
          </div>
          <div className="container d-flex flex-wrap flex-row justify-content-center">
            {giphyResults.length === 0
              ? null
              : showGifs
              ? giphyResults.map(gif => (
                  <img
                    src={gif.images.fixed_width.url}
                    alt="gif"
                    key={gif.id}
                    className="m-2"
                    width="150px"
                    height="150px"
                    style={{ objectFit: "cover" }}
                    onClick={e => selectGif(e, gif.images.fixed_height.url)}
                  />
                ))
              : null}
          </div>
          <div className="form-group mt-3">
            <label htmlFor="gif">Gif URL</label>
            <input
              type="text"
              className="form-control"
              id="gif"
              placeholder="Gif URL"
              value={gif}
              name="gif"
              onChange={gifOnChange}
              required
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
            <button className="btn btn-primary mr-3">Post</button>
            <Link className="btn btn-primary" to="/diary">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

GiphySearch.propTypes = {
  getGifs: PropTypes.func.isRequired,
  createPost: PropTypes.func.isRequired,
  giphy: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  giphy: state.giphy
});

export default connect(
  mapStateToProps,
  { getGifs, createPost }
)(withRouter(GiphySearch));
