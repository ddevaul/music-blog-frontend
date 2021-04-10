import React from "react";

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    }
  }
  login = async (event) => {
    event.preventDefault();
    console.log("send request");
    const requestOptions = {
      mode: 'cors',
      method: 'POST',
      headers: {'Content-Type': 'multipart/form-data'},
      body: { username: this.state.username, password: this.state.password }
    };
    console.log(requestOptions)
    const response = await fetch('http://localhost:3000/login', requestOptions)
    console.log(response);
      // .then(data => console.log(data));
  }
  handleUsername = (event) => {
    this.setState({username: event.target.value})
  }
  handlePassword = (event) => {
    this.setState({password: event.target.value})
  }
  render() {
    return (
      <form>
        <input onChange={this.handleUsername} value={this.state.username} placeholder="username"></input>
        <input onChange={this.handlePassword} value={this.state.password} type="password" placeholder="password"></input>
        <input onClick={this.login} type="submit"></input>
      </form>
      
    )
  }
}