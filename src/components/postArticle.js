import React from "react";
import { Editor } from "@tinymce/tinymce-react";



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
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ title: this.state.title, content: this.state.content })
    };
    const response = await fetch('https://music-blog-desi.herokuapp.com/articles', requestOptions)
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
  handleContent = (content) => {
    this.setState({content: content})
  }
  render() {
    return (
      <div style={{margin: "2rem"}}>
        <h1>{this.state.message}</h1>
        <form style={{display: "flex", flexDirection: "column"}}>
        <input onChange={this.handletitle} value={this.state.title} placeholder="title"></input>
        <Editor
          apiKey="c88ot38huyx82k9d2a4hlyo6goh6wmkwwdsbecbmoxnmlhgm"
          plugins="wordcount"
          onEditorChange={this.handleContent}
        />
        <input style={{width: '5rem'}} onClick={this.postArticle} type="submit"></input>
        </form>
      </div>
      
    )
  }
}