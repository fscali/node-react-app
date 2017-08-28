import React, { Component } from "react";

import { BrowserRouter, Route } from "react-router-dom";

import Header from "./header";
import * as actions from "../actions";

import { connect } from "react-redux";
import Landing from "./landing";

const DashBoard = () => <h2>DashBoard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route path="/" exact component={Landing} />
            <Route path="/surveys/new" component={SurveyNew} />
            <Route path="/surveys" exact component={DashBoard} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
