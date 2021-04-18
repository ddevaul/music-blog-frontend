import React from "react";
import Button from "react-bootstrap/Button";
import { Redirect } from 'react-router'

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      message: "",
      refresh: false,
    }
  }
  login = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: this.state.username, password: this.state.password })
    };
    const response = await fetch('https://music-blog-desi.herokuapp.com/login', requestOptions)
    const jResponse = await response.json();
    localStorage.setItem('token', jResponse.token);
    localStorage.setItem('user', JSON.stringify(jResponse.user));
    if (jResponse.message === "success") {
      this.setState({ message: "Signed in" });
      window.location.reload();
    } 
    else {
      this.setState({ message: "error signing in. double check email and password" })
    }
  }
  logout = () => {
    localStorage.clear();
    window.location.reload();
    this.setState({ message: "Logged out", refresh: true })
  }
  handleUsername = (event) => {
    this.setState({ username: event.target.value })
  }
  handlePassword = (event) => {
    this.setState({ password: event.target.value })
  }
  render() {
   if (this.state.refresh) {
      <Redirect to="/#/login"></Redirect>
    }
    if (localStorage.getItem('token')) {
      return (
        <div style={{margin: "2rem"}}>
          <h3>{this.state.message}</h3>
          <Button onClick={this.logout}>Log out</Button>
       </div>
      )
    } 
    else {
      return (
        <div style={{marginLeft: "2rem"}}>
          <h3>{this.state.message}</h3>
          <form>
            <input onChange={this.handleUsername} value={this.state.username} placeholder="username"></input>
            <input onChange={this.handlePassword} value={this.state.password} type="password" placeholder="password"></input>
            <input onClick={this.login} type="submit"></input>
          </form>
        </div>
      )
    }
  }
}