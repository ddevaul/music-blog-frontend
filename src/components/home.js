import React from "react";

export default class Home extends React.Component {
 
  render() {
    const images = require.context("../images", true);
    let img = images('./hp.jpg').default;
    return (
      <div style={{
        backgroundImage: `url(${img})`, 
        backgroundSize: 'cover',
        height: '100vh',
        width: '100vw',
        position: 'relative',
        top: '-2rem'
        }}>
        <h1 style={{margin: "2rem", color: "white"}}>Logo</h1>
        <ul style={{ listStyle: 'none', color: 'white' }}>
          <li><a style={{ color: 'white' }} href='/music-blog-frontend/#/articles'>Articles</a></li>
          <li><a style={{ color: 'white' }} href='/music-blog-frontend/#/about'>About</a></li>
          <li><a style={{ color: 'white' }} href='/music-blog-frontend/#/login'>Login</a></li>
          <li><a style={{ color: 'white' }} href='/music-blog-frontend/#/postarticle'>Post Article</a></li>
        </ul>
      </div>
    )
  }
}