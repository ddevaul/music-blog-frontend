import React from "react";
import Button from "react-bootstrap/Button";
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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: this.state.username, password: this.state.password })
    };
    const response = await fetch('https://music-blog-desi.herokuapp.com/login', requestOptions)
    const jResponse = await response.json();
    localStorage.setItem('token', jResponse.token);
  }
  handleUsername = (event) => {
    this.setState({username: event.target.value})
  }
  handlePassword = (event) => {
    this.setState({password: event.target.value})
  }
  logout = () => {
    localStorage.clear();
  }
  render() {
    return (
      <div>
        <Button onClick={this.logout}>Log out</Button>
        <form>
          <input onChange={this.handleUsername} value={this.state.username} placeholder="username"></input>
          <input onChange={this.handlePassword} value={this.state.password} type="password" placeholder="password"></input>
          <input onClick={this.login} type="submit"></input>
        </form>
      </div>
      
    )
  }
}