import React from "react";
import Comment from "./comment";
import Button from "react-bootstrap/Button";
import he from 'he';
import parse from 'html-react-parser';
import { Editor } from "@tinymce/tinymce-react";

export default class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
      message:"",
      comments: [],
      newComment: "",
      editing: false,
      user: {},
    }
  }
  componentDidMount() {
    this.setArticles();

    this.setUser();
  }
  setUser = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    };
    const response = await fetch(`https://music-blog-desi.herokuapp.com/users`, requestOptions)
    const jsonResponse = await response.json();
    this.setState({user: jsonResponse.user});
  }
  // https://music-blog-desi.herokuapp.com
  setArticles = async () => {
    const response = await fetch(`https://music-blog-desi.herokuapp.com/articles/article/${this.props.match.params.id}`, {mode: 'cors'})
    const jsonResponse = await response.json();
    const hedecoded = he.decode(jsonResponse[0].content);
    this.setState({title: jsonResponse[0].title, content: hedecoded, comments: jsonResponse[0].comments});
  }
  deleteArticle = async () => {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    };
    const response = await fetch(`https://music-blog-desi.herokuapp.com/articles/article/${this.props.match.params.id}`, requestOptions)
    const jResponse = await response.json();
    if (jResponse === "Article deleted") {
      this.setState({message: "Article deleted"});
    }
  }
  toggleEditing = () => {
    this.setState({editing: !this.state.editing});
  }
  handleContent = (content) => {
    this.setState({content: content})
  }
  updateArticle = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ title: this.state.title, content: this.state.content })
    };
    const response = await fetch(`https://music-blog-desi.herokuapp.com/articles/article/${this.props.match.params.id}`, requestOptions)
    if(response.status === 200) {
      this.setState({message: "Article updated"});
    } 
    else {
      this.setState({message: "Article not updated"});
    }
  }
  handletitle = (event) => {
    this.setState({title: event.target.value})
  }
  handleComment = (event) => {
    this.setState({newComment: event.target.value});
  }
  postComment = async (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ content: this.state.newComment, username: user.username})
    };
    const response = await fetch(`https://music-blog-desi.herokuapp.com/articles/article/${this.props.match.params.id}/comment`, requestOptions)
    const jResponse = await response.json();
    console.log(jResponse);
    if (jResponse === "comment posted") {
      this.setState({message: "Comment posted"});
      this.setState({newComment: ""});  
      window.location.reload();
      }
    }
  deleteComment = async (comment) => {
    const requestOptions = {
      method: 'Delete',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    };
    const response = await fetch(`https://music-blog-desi.herokuapp.com/articles/article/${this.props.match.params.id}/comment/${comment._id}`, requestOptions)
    const jResponse = await response.json();
    if (jResponse === "Comment deleted") {
      this.setState({message: "Comment deleted"});
      window.location.reload(); 
    }
  }
  render() {
    // need to have condition if user isn't logged in
    const centeredText = {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "2rem"
    }
    const commentFormStyle = {
      marginBottom: "2rem",
      marginLeft: "2rem",
      display: "flex", 
      flexDirection: "column",
      width: "20rem",
    }
    const buttonStyle = {
      marginTop: "0.5rem",
      width: '5rem',
    }
    if (this.state.user.username === "Hamlet") {
      if (this.state.editing) {
        return (
          <div style={{margin: "2rem"}}>
            <h1>{this.state.message}</h1>
            <form style={{display: "flex", flexDirection: "column"}}>
            <input onChange={this.handletitle} defaultValue={this.state.title} placeholder="title"></input>
            <Editor
              value={this.state.content}
              apiKey="c88ot38huyx82k9d2a4hlyo6goh6wmkwwdsbecbmoxnmlhgm"
              plugins="wordcount"
              onEditorChange={this.handleContent}
            />
            <input style={buttonStyle} onClick={this.updateArticle} type="submit"></input>
            </form>
             <h3>Comments:</h3>
            <form style={commentFormStyle} onSubmit={this.postComment}>
              <input onChange={this.handleComment} placeholder="Leave a comment"></input>
              <input style={buttonStyle} type="submit"></input>
            </form>
            {this.state.comments.map((comment, index) => {
              return (
                <Comment delete={this.deleteComment} user={this.state.user} comment={comment} key={index}></Comment>
              )
            })}
            <Button onClick={this.deleteArticle}>Delete</Button>
            <Button onClick={this.toggleEditing}>Don't Update</Button>
          </div>
          
        )
      }
      return (
        <div>
          <h1>{this.state.message}</h1>
          <div style={centeredText}>
            <h1>{this.state.title}</h1>
          </div>
          <div style={centeredText}>{parse(this.state.content)}</div>
        <h3>Comments:</h3>
          <form style={commentFormStyle} onSubmit={this.postComment}>
              <input onChange={this.handleComment} placeholder="Leave a comment"></input>
              <input style={buttonStyle} type="submit"></input>
            </form>
          {this.state.comments.map((comment, index) => {
              return (
                <Comment delete={this.deleteComment} user={this.state.user} comment={comment} key={index}></Comment>
              )
            })}
          <Button style={{marginTop: "1rem", marginLeft: "2rem"}} onClick={this.deleteArticle}>Delete</Button>
          <Button style={{marginTop: "1rem"}} onClick={this.toggleEditing}>Update</Button>
        </div>
      )
    }
    let commentForm; 
    if (localStorage.getItem('token')) {
      commentForm = <form style={commentFormStyle} onSubmit={this.postComment}>
      <input onChange={this.handleComment} placeholder="Leave a comment"></input>
      <input style={{width: '5rem'}} type="submit"></input>
    </form>
    } 
    else {
      commentForm = 
        <div>
          <p><a href="/login">Login</a> to leave a comment</p>
        </div>
    }
    return (
      <div>
        <h1 style={centeredText}>{this.state.title}</h1>
        <div style={centeredText}>{parse(this.state.content)}</div>
        <h3>Comments:</h3>
        {commentForm}
        {this.state.comments.map((comment, index) => {
              return (
                <Comment delete={this.deleteComment} user={this.state.user} comment={comment} key={index}></Comment>
              )
            })}
      </div>
    )
  }
}