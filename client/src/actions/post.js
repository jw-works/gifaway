import { GET_POSTS, POST_ERROR, ADD_LIKE, REMOVE_LIKE } from "../actions/types";
import axios from "axios";

//Get Posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get("/api/posts");

    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//Like Post
export const likePost = (
  postId,
  history,
  isAuthenticated = true
) => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);

    dispatch({
      type: ADD_LIKE,
      payload: { postId, likes: res.data }
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
    if (!isAuthenticated) {
      history.push("/login");
    }
  }
};

//Unlike post
export const unlikePost = (
  postId,
  history,
  isAuthenticated = true
) => async dispatch => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`);

    if (!isAuthenticated) {
      history.push("/login");
    } else {
      dispatch({
        type: REMOVE_LIKE,
        payload: { postId, likes: res.data }
      });
    }
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
    if (!isAuthenticated) {
      history.push("/login");
    }
  }
};

//Create a post
export const createPost = formData => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    await axios.post("/api/posts/", formData, config);

    getPosts();
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//Delete a post
export const deletePost = postId => async dispatch => {
  try {
    await axios.delete(`api/posts/${postId}`);

    getPosts();
  } catch (error) {
    console.log(error);
  }
};
