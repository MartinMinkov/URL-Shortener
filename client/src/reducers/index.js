import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import urlReducer from "./urlReducer";

export default combineReducers({
  form: formReducer,
  urls: urlReducer,
  auth: authReducer
});
