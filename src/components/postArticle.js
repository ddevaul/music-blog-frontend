import React from "react";

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      message:"",
    }
  }
  postArticle = async (event) => {
    event.preventDefault();
    console.log("send request");
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ title: this.state.title, content: this.state.content })
    };
    const response = await fetch('https://music-blog-desi.herokuapp.com/articles', requestOptions)
    const jResponse = await response.json();
    console.log(jResponse);
    if(response.status === 200) {
      this.setState({message: "Article posted"});
    } 
    else {
      this.setState({message: "Article not posted"});
    }
  }
  handletitle = (event) => {
    this.setState({title: event.target.value})
  }
  handleContent = (event) => {
    this.setState({content: event.target.value})
  }
  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
        <form>
        <input onChange={this.handletitle} value={this.state.title} placeholder="title"></input>
        <input onChange={this.handleContent} value={this.state.content} type="text" placeholder="content"></input>
        <input onClick={this.postArticle} type="submit"></input>
        </form>
      </div>
      
    )
  }
}