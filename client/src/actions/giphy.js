import axios from "axios";
import { FETCH_GIFS, FETCH_ERROR } from "./types";
import setAuthToken from "../utils/setAuthToken";
import config from "../config";

//Get Gifs
export const getGifs = searchTerm => async dispatch => {
  const api_key = config.GIPHY_API_KEY;

  try {
    delete axios.defaults.headers.common["x-auth-token"];

    const res = await axios.get(
      `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${api_key}&limit=100&rating=g`
    );

    setAuthToken(localStorage.token);

    dispatch({
      type: FETCH_GIFS,
      payload: res.data.data
    });
  } catch (error) {
    dispatch({
      type: FETCH_ERROR,
      payload: { msg: "Fetch Error" }
    });
  }
};
