import { FETCH_GIFS, FETCH_ERROR } from "../actions/types";

const initialState = {
  giphyResults: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_GIFS:
      return { ...state, giphyResults: payload, loading: false };

    case FETCH_ERROR:
      return {
        ...state,
        error: payload
      };
    default:
      return state;
  }
}
