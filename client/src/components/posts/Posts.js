import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPostsWithPagination } from "../../actions/post";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";

const Posts = ({ getPostsWithPagination, post: { posts, loading, pages } }) => {
  const [state, setstate] = useState({
    count: 1
  });

  const { count } = state;

  useEffect(() => {
    getPostsWithPagination(count);
  }, [getPostsWithPagination, count]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="container mt-5">
        <div className="card-columns">
          {posts.map(post => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      </div>

      <div className="container text-center mb-5">
        {count !== pages ? (
          <button
            className="btn btn-outline-primary"
            onClick={() => setstate({ count: count + 1 })}
          >
            More...
          </button>
        ) : (
          <div className="container text-center mt-5 mb-5">
            <p className="lead">That's all folks!</p>
          </div>
        )}
      </div>
    </Fragment>
  );
};

Posts.protoTypes = {
  getPostsWithPagination: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPostsWithPagination }
)(Posts);
