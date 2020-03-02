import urls from "../apis/urls";
import { SIGN_IN, SIGN_OUT, CREATE_URL, FETCH_URLS } from "./types";

export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const createURL = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await urls.post("/urls", { formValues, userId });
  dispatch({ type: CREATE_URL, payload: response.data });
};

export const fetchURL = () => async dispatch => {
  const response = await urls.get("/urls");
  dispatch({ type: FETCH_URLS, payload: response.data });
};
