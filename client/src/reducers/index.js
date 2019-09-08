import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import post from "./post";
import giphy from "./giphy";

export default combineReducers({
  alert,
  auth,
  profile,
  post,
  giphy
});
