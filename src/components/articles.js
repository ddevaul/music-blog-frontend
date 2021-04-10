import React from "react";
import Card from "react-bootstrap/Card";
// create pagination
// then create routing
// pages: 
  // home - show top three articles or something
  // articles, paginated, 20 articles per page
  // single article page
export default class Articles extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      articles: [],
    };
  }
  render() {
    return (
      <div>
       {this.props.articles.map((article, index) => {
         return (
          <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>{article.title}</Card.Title>
            <Card.Text>
              {article.content}
            </Card.Text>
            <a href={`/article/${article._id}`}>Read</a>
          </Card.Body>
        </Card>
         )
       })}
      </div>
      
    )
  }
}