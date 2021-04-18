import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";


export default class Comment extends React.Component {

  render() {
    const cardStyle = {
      width: "20rem",
      marginLeft: "2rem",
      padding: "1rem",
    }
    const delStyle = {
      width: "10rem",
    }

    const { comment, user } = this.props;
    let delButton; 
    if (user._id === comment.userid || user.username === "Hamlet") {
      delButton = <Button onClick={() => this.props.delete(comment)} style={delStyle}>Delete Comment</Button>
    }
    return (
        <Card style={cardStyle}>
          <h5>{comment.content}</h5>
          <p>{`-${comment.username}`}</p>
          {delButton}
        </Card>
    )
  }
}