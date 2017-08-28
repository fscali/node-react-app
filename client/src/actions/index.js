import axios from "axios";
import { FETCH_USER } from "./types";

//this ES6 syntax means that the fetchUser returns a function with a dispatch argument. That function contains an await statement, so we
//put the async keyword in front of the function
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");
  dispatch({
    type: FETCH_USER,
    payload: res.data
  });

  //because in the index.js we configured the redux-thunk middleware, that library will automatically
  //inspect every action creator, and if the action creator returns a function, like this one, it will automatically
  //inject the dispatch function inside the function so that we can use it
};

export const handleToken = token => async dispatch => {
  const res = await axios.post("/api/stripe", token);

  //the backend server sends back the user model with the updated number of credits, so we can use the same action type
  //as the fetchUser action creator
  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};
