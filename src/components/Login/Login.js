import React, { Component } from "react";
import logo from "./communityBank.svg";
import axios from "axios";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  async register() {
    const { email, password } = this.state;
    const res = await axios.post("/auth/register", {
      email: email,
      password: password
    });
    // above is the same as this: axios.post('/auth/register', { email: email, password: password }).then(res => {})
    if (res.data.loggedIn) {
      this.props.history.push("/private");
    } else {
      alert(`registration failed`);
    }
  }

  async login() {
    const { email, password } = this.state;
    const res = await axios.post("/auth/login", {
      email: email,
      password: password
    });
    // above is the same as this: axios.post('/auth/register', { email: email, password: password }).then(res => {})
    if (res.data.loggedIn) {
      this.props.history.push("/private");
    } else {
      alert(`login failed`);
    }
  }

  render() {
    return (
      <div className="login-container">
        <img className="logo" src={logo} alt="bank logo" />
        <div className="input-container">
          <p>
            <span>Email:</span>
            <input
              onChange={e => this.setState({ email: e.target.value })}
              value={this.state.email}
              type="text"
            />
          </p>
          <p>
            <span>Password:</span>
            <input
              onChange={e => this.setState({ password: e.target.value })}
              value={this.state.password}
              type="password"
            />
          </p>
        </div>
        <div className="button-container">
          <button onClick={() => this.register()}>Register</button>
          <button onClick={() => this.login()}>Login</button>
        </div>
      </div>
    );
  }
}

export default Login;
