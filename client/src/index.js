import "materialize-css/dist/css/materialize.min.css";
import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import reducers from "./reducers";

import App from "./components/app";

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    {/* The Provider tag observes the store and notifies any change of its state to the components included in the app  */}
    <App />
  </Provider>,
  document.getElementById("root")
);
