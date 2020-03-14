import _ from "lodash";

import { CREATE_URL, FETCH_URLS, SIGN_OUT } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_URL:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_URLS:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case SIGN_OUT:
      return {};
    default:
      return state;
  }
};
