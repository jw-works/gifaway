import { GET_POSTS, POST_ERROR, ADD_LIKE, REMOVE_LIKE } from "../actions/types";

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };

    case POST_ERROR:
      return {
        ...state,
        loading: false,
        error: payload
      };

    case ADD_LIKE:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.postId ? { ...post, likes: payload.likes } : post
        ),
        loading: false
      };

    case REMOVE_LIKE:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.postId ? { ...post, likes: payload.likes } : post
        ),
        loading: false
      };

    default:
      return state;
  }
}
