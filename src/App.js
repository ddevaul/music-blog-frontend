import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Articles from './components/articles'
import Article from './components/article'
import About from './components/about'
import Nav from './components/nav'
import Login from './components/login'

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
    const response = await fetch('http://localhost:3000/articles', {mode: 'cors'})
    const jsonResponse = await response.json();
    this.setState({articles: [...jsonResponse]});
  }
  render() {
    return(
      <BrowserRouter>
        <Nav></Nav>
        <Switch>
          <Route exact path="/" render={() => <Articles articles={this.state.articles}></Articles>}></Route>
          <Route exact path="/about" render={() => <About></About>}></Route>
          <Route component={Article} path="/article/:id" render={() => <Article></Article>}></Route>
          <Route path="/login" render={() => <Login></Login>}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}

