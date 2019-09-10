import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile } from "../../actions/profile";
import SetStatus from "./SetStatus";
import Spinner from "../layout/Spinner";
import "./Diary.css";
import PostItem from "../posts/PostItem";
import { getPosts } from "../../actions/post";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";

const Dairy = ({
  getCurrentProfile,
  getPosts,
  auth: { user, isAuthenticated },
  posts,
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading && profile === null ? (
    <Spinner />
  ) : profile === null ? (
    <SetStatus />
  ) : (
    <div>
      <div className="container text-center mt-5 Diary">
        <div className="displayname text-center">
          <h1 className="display-1">@{user && user.username}</h1>
          <p className="mt-3">
            {profile.phrase} <br />
            <Link className="btn btn-primary m-2" to="/edit-status">
              Edit Status
            </Link>
            <Link className="btn btn-primary m-2" to="/create-post">
              Create Post
            </Link>
          </p>
        </div>
      </div>
      <div className="container mt-4">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              id="home-tab"
              data-toggle="tab"
              href="#home"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              Your posts
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              id="profile-tab"
              data-toggle="tab"
              href="#profile"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              Liked Posts
            </a>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            {!loading && isAuthenticated && profile !== null && (
              <div className="container mt-5">
                <div className="card-columns">
                  {posts.map(post => {
                    if (post.user === profile.user._id) {
                      return <PostItem key={post._id} post={post} />;
                    }
                    return null;
                  })}
                </div>
                <ScrollUpButton />
              </div>
            )}
          </div>
          <div
            className="tab-pane fade"
            id="profile"
            role="tabpanel"
            aria-labelledby="profile-tab"
          >
            {!loading && isAuthenticated && profile !== null && (
              <div className="container mt-5">
                <div className="card-columns">
                  {posts.map(post => {
                    if (
                      post.likes.filter(like => like.user === profile.user._id)
                        .length > 0
                    ) {
                      return <PostItem key={post._id} post={post} />;
                    }
                    return null;
                  })}
                </div>
                <ScrollUpButton />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Dairy.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  posts: state.post.posts
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, getPosts }
)(Dairy);
