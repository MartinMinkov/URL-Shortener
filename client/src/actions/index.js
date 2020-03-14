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
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const { userId } = getState().auth;
  const body = JSON.stringify({ userId });
  const response = await urls.get("/urls", {
    params: {
      userId
    }
  });
  console.log(response);
  dispatch({ type: FETCH_URLS, payload: response.data });
};
