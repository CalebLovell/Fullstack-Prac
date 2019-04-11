import React, { Component } from "react";
import { connect } from "react-redux";
import { getData } from "./../../ducks/userReducer";
import { Link } from "react-router-dom";

class Private extends Component {
  componentDidMount() {
    this.props.getData();
  }

  balance() {
    return Math.floor((Math.random() + 100) * 698798798797);
  }

  render() {
    console.log(this.props);
    const { id, email } = this.props.user;
    return (
      <div>
        <h1>Account Summary</h1>
        <hr />
        <hr />
        <hr />
        {id ? ( // check if id is truthy or falsy
          <div>
            <p>Account Name: Caleb Lovell</p>
            <p>Account Email: {email}</p>
            <p>Account ID: {id}</p>
            <p>Balance: ${this.balance()}</p>
            <a href="http://localhost:4000/logout">
              <button>Logout</button>
            </a>
          </div>
        ) : (
          <div>
            <p>Please log in</p>
            <Link to="/">
              <button>Login</button>
            </Link>
          </div>
        )}
      </div>
    );
  }
}
const mapState = reduxState => reduxState;

export default connect(
  mapState,
  { getData }
)(Private);
