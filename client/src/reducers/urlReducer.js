import _ from "lodash";

import { CREATE_URL, FETCH_URLS, SIGN_OUT, DELETE_URL } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_URL:
      console.log(action.payload);
      return { ...state, [action.payload._id]: action.payload };
    case FETCH_URLS:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case DELETE_URL:
      return _.omit(state, action.payload);
    case SIGN_OUT:
      return {};
    default:
      return state;
  }
};
