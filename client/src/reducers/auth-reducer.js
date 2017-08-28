import { FETCH_USER } from "../actions/types";
export default (state = null, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false; // if logged in -> the user model coming from the backend; if not logged in -> false (the backend returns empty string)
    default:
      return state;
  }
};
