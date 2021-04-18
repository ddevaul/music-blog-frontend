import React from "react";
import Navbar from "react-bootstrap/Navbar";

export default class Nav extends React.Component {

  render() {
    const navbarStyle = {
      backgroundColor: "rgb(61, 102, 168)",
      marginBottom: "1rem",
    }
    const textStyle = {
      color: "white",
    }
    let login;
    if (localStorage.getItem('token')) {
        login = 
        <div>
          <Navbar.Text style={{marginLeft: "1rem"}}>
            <a style={textStyle} href="/music-blog-frontend/articles">Articles</a>
          </Navbar.Text>
          <Navbar.Text style={{marginLeft: "1rem"}}>
            <a style={textStyle} href="/music-blog-frontend/login">Logout</a>
          </Navbar.Text>
        </div>
    } 
    else {
      login = 
        <div>
        <Navbar.Text style={{marginLeft: "1rem"}}>
          <a style={textStyle} href="/music-blog-frontend/articles">Articles</a>
        </Navbar.Text>
        <Navbar.Text style={{marginLeft: "1rem"}}>
          <a style={textStyle} href="/music-blog-frontend/login">Login</a>
        </Navbar.Text>
        <Navbar.Text style={{marginLeft: "1rem"}}>
        <a style={textStyle} href="/music-blog-frontend/signup">Signup</a>
        </Navbar.Text>
      </div>
    }
    return (
      <Navbar variant="light" style={navbarStyle}>
        <Navbar.Brand style={textStyle} href="/music-blog-frontend">Desi's Music Blog</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {login}
          <Navbar.Text style={{marginLeft: "1rem"}}>
            <a style={textStyle} href="/music-blog-frontend/about">About</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar> 
    )
  }
}