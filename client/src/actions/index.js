import urls from "../apis/urls";
import { SIGN_IN, SIGN_OUT, CREATE_URL, FETCH_URLS, DELETE_URL } from "./types";

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
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const { userId } = getState().auth;
  const { url } = formValues;
  const body = JSON.stringify({ destination: url, userId });
  const response = await urls.post("/urls", body, config);
  dispatch({ type: CREATE_URL, payload: response.data });
};

export const fetchURLS = () => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await urls.get("/urls", {
    params: {
      userId
    }
  });
  dispatch({ type: FETCH_URLS, payload: response.data });
};

export const deleteURL = urlId => async dispatch => {
  await urls.delete(`/urls/${urlId}`);
  console.log("URLID", urlId);
  dispatch({ type: DELETE_URL, payload: urlId });
};
