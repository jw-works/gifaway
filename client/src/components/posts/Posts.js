import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getPostsWithPagination } from "../../actions/post";
import Spinner from "../layout/Spinner";
import PostItem from "./PostItem";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";

const Posts = ({
  isAuthenticated,
  getPostsWithPagination,
  post: { posts, loading, pages }
}) => {
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
      {!isAuthenticated ? (
        <div className="container">
          <div className="container mt-5 mb-4 text-center text-justify border p-3">
            <p className="lead">
              Explore the posts made by our users. <br /> Want to join our
              community and share posts that other people can relate?{" "}
            </p>
            <div className="container">
              <Link to="/login" className="mr-3 btn btn-primary">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Register
              </Link>
            </div>
          </div>
        </div>
      ) : null}

      <div className="container mt-5 Posts">
        <div className="card-columns">
          {posts.map(post => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
        <ScrollUpButton ContainerClassName="scroll" />
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
  post: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getPostsWithPagination }
)(Posts);
