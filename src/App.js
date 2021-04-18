import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/home'
import Articles from './components/articles'
import Article from './components/article'
import About from './components/about'
import Nav from './components/nav'
import Login from './components/login'
import Signup from './components/signup'
import PostArticle from './components/postArticle'
import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

export default class App extends React.Component {

  render() {
    return(
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Nav></Nav>
        <Switch>
          <Route exact path="/" render={() => <Home></Home>}></Route>
          <Route exact path="/articles" render={() => <Articles></Articles>}></Route>
          <Route exact path="/about" render={() => <About></About>}></Route>
          <Route component={Article} path="/article/:id"></Route>
          <Route path="/login" render={() => <Login></Login>}></Route> 
          <Route path="/signup" render={() => <Signup></Signup>}></Route> 
          <Route path="/postarticle" render={() => <PostArticle></PostArticle>}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

