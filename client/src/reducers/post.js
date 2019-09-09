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

const initialState = {
  posts: [],
  pages: null,
  post: {},
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

    case GET_POSTS_WITH_PAGINATION:
      return {
        ...state,
        posts: [...state.posts, payload],
        loading: false
      };

    case GET_POST:
      return {
        ...state,
        post: payload,
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

    case CLEAR_POSTS:
      return {
        ...state,
        posts: [],
        loading: false
      };

    case SET_PAGES:
      return {
        ...state,
        pages: payload
      };
    default:
      return state;
  }
}
