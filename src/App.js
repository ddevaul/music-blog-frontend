import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Articles from './components/articles'
import Article from './components/article'
import About from './components/about'
import Nav from './components/nav'
import Login from './components/login'
import PostArticle from './components/postArticle'


import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

export default class App extends React.Component {
  constructor(){
    super();
    this.state = {
      articles: [],
    };
  }
  componentDidMount() {
    this.setArticles();
  }
  setArticles = async () => {
    const response = await fetch('https://music-blog-desi.herokuapp.com/articles', {mode: 'cors'})
    const jsonResponse = await response.json();
    this.setState({articles: [...jsonResponse]});
  }
  render() {
    return(
      <BrowserRouter>
        <Nav></Nav>
        <Switch>
          <Route exact path="/music-blog-frontend" render={() => <Articles articles={this.state.articles}></Articles>}></Route>
          <Route exact path="/music-blog-frontend/about" render={() => <About></About>}></Route>
          <Route component={Article} path="/music-blog-frontend/article/:id" render={() => <Article></Article>}></Route>
          <Route path="/music-blog-frontend/login" render={() => <Login></Login>}></Route>
          <Route path="/music-blog-frontend/postarticle" render={() => <PostArticle></PostArticle>}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

