import {
  GET_POSTS,
  POST_ERROR,
  ADD_LIKE,
  REMOVE_LIKE,
  GET_POST,
  GET_POSTS_WITH_PAGINATION,
  CLEAR_POSTS,
  SET_PAGES
} from "../actions/types";
import axios from "axios";

//Get Single Post
export const getPost = postID => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/post/${postID}`);
    dispatch({
      type: GET_POST,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//Get all posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/`);

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

//Get Posts with pagination
export const getPostsWithPagination = pageNumber => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${pageNumber}`);

    if (pageNumber === 1) {
      dispatch({
        type: CLEAR_POSTS,
        payload: res.data.pages
      });
      dispatch({
        type: SET_PAGES,
        payload: res.data.pages
      });
    }

    res.data.posts.map(post => {
      return dispatch({
        type: GET_POSTS_WITH_PAGINATION,
        payload: post
      });
    });
  } catch (error) {
    console.log(error.message);
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
export const createPost = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    await axios.post("/api/posts/", formData, config);

    getPosts();

    history.push("/explore");
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.message }
    });
  }
};

//Delete a post
export const deletePost = postId => async dispatch => {
  try {
    await axios.delete(`api/posts/${postId}`);

    getPosts();
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

//Edit Post
export const editPost = (postId, formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    await axios.put(`/api/posts/post/${postId}`, formData, config);

    history.push("/diary");
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
