import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { getUserProfile } from "../../actions/profile";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";

const UsersDairy = ({
  getUserProfile,
  profile: { loading, profile },
  match,
  posts
}) => {
  useEffect(() => {
    getUserProfile(match.params.id);
    window.scroll(0, 0);
  }, [getUserProfile, match.params.id]);

  if (loading) {
    return <Spinner />;
  }

  return !loading && profile !== null ? (
    <div className="container text-center mt-5 Diary">
      <div className="displayname text-center">
        <h1 className="display-1">@{profile.user.username}</h1>
        <p className="mt-3">{profile.phrase}</p>
      </div>
      <div className="container mt-5">
        <div className="container mt-5">
          <div class="card-columns">
            {posts.map(post => {
              if (post.user === profile.user._id) {
                return <PostItem key={post._id} post={post} />;
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="container text-center">
      <h1 className="display-4">
        The user does not exist / has not setup a profile
      </h1>
    </div>
  );
};

UsersDairy.propTypes = {
  profile: PropTypes.object.isRequired,
  getUserProfile: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  posts: state.post.posts
});

export default connect(
  mapStateToProps,
  { getUserProfile }
)(UsersDairy);
