import axios from "axios";
// import setAlert from "./alert";
import { GET_PROFILE, PROFILE_ERROR } from "../actions/types";
import { setAlert } from "./alert";

//Get current users profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR
    });
  }
};

//Create / Update profile
export const createProfile = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("/api/profile", formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    history.push("/diary");

    dispatch(setAlert("Profile Updated", "success"));
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR
    });
  }
};
