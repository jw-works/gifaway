import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { getGifs } from "../../actions/giphy";
import PropTypes from "prop-types";

const GiphySearch = ({ giphy: { giphyResults, loading }, getGifs }) => {
  const [state, setstate] = useState({
    showGifs: true,
    searchTerm: "",
    gif: "",
    title: "",
    body: ""
  });

  const { showGifs, searchTerm, title, body, gif } = state;

  const onChange = e => {
    e.preventDefault();
    setstate({
      ...state,
      [e.target.name]: e.target.value
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
    console.log(gif, title, body);
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
                    src={gif.images.fixed_height.url}
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
  );
};

GiphySearch.propTypes = {
  getGifs: PropTypes.func.isRequired,
  giphy: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  giphy: state.giphy
});

export default connect(
  mapStateToProps,
  { getGifs }
)(GiphySearch);
