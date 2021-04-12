import React from "react";
import Button from "react-bootstrap/Button";
  
export default class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: ""
    }
  }
  showProps = () => {
    console.log(window.location);
    console.log(this.props.location.search)
    console.log(this.props.match.params.id)

  }
  componentDidMount() {
    this.setArticles();

  }

  
  setArticles = async () => {
    const response = await fetch(`https://music-blog-desi.herokuapp.com/articles/${this.props.match.params.id}`, {mode: 'cors'})
    const jsonResponse = await response.json();
    console.log(response)
    this.setState({article: jsonResponse});
  }
  render() {
    return (
      <div>
        <h1>{this.state.article.title}</h1>
        <p>{this.state.article.text}</p>
        <Button onClick={this.showProps}>{this.state.article.text}</Button>
      </div>
    )
  }
}