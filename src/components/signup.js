import React from "react";
import { Redirect } from 'react-router'
export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      confirmation: "",
      message:"",
      redirect: false
    }
  }
  signup = async (event) => {
    event.preventDefault();
    if (this.state.confrimation !== this.state.password) {
      this.setState({ message: "Passwords must match" });
    }
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: this.state.username, password: this.state.password, confirmation: this.state.confirmation})
    };
    const response = await fetch('https://music-blog-desi.herokuapp.com/signup', requestOptions)
    const jResponse = await response.json();
    console.log(jResponse);
    if (jResponse.message === "success") {
      this.setState({message: "signed up"})
    } 
    else if (jResponse.message === "passwords must match"){
      this.setState({ message: "passwords must match" });
    }
    else if (jResponse.message === 'username already taken'){
      this.setState({ message: "username already taken" });
    }
    else if (jResponse.message === "user created") {
      this.setState({ message: "signed up!", redirect: true });
    }
  }
  handleUsername = (event) => {
    this.setState({ username: event.target.value })
  }
  handlePassword = (event) => {
    this.setState({ password: event.target.value })
  }
  handleConfirmation = (event) => {
    this.setState({ confirmation: event.target.value })
  }
  render() {
    if (this.state.redirect) {
      return (
        <Redirect to="/#/login"></Redirect>
      )
    }
    return (
      <div style={{marginLeft: "2rem"}}>
        <h3>{this.state.message}</h3>
        <form>
          <input onChange={this.handleUsername} value={this.state.username} placeholder="username"></input>
          <input onChange={this.handlePassword} value={this.state.password} type="password" placeholder="password"></input>
          <input onChange={this.handleConfirmation} value={this.state.confrimation} type="password" placeholder="confirm password"></input>
          <input onClick={this.signup} type="submit" value="Signup"></input>
        </form>
        <div style={{margin: "2rem"}}>
        </div>
      </div>
      
    )
  }
}