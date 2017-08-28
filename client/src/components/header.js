import React, { Component } from "react";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import Payments from "./payments";

class Header extends Component {
  renderContent() {
    console.log(this.props.auth);

    switch (this.props.auth) {
      case null:
        //return "still deciding..";
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Login With Google</a>
          </li>
        );
      default:
        return [
          <li key={"1"}>
            <Payments />
          </li>,
          <li key={"2"}>
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  }

  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to={this.props.auth ? "/surveys" : "/"}
            className="left brand-logo"
          >
            Emaily
          </Link>

          <ul id="nav-mobile" className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, null)(Header);
