import React from "react";
import Button from "react-bootstrap/Button";

export default class Nav extends React.Component {

  render() {
    return (
      <div>
        <a href="/music-blog-frontend">home</a>
        <a href="/music-blog-frontend/about">about</a>
      </div>
      
    )
  }
}