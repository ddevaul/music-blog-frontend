import React from "react";
import Card from "react-bootstrap/Card";
import Pagination from "react-bootstrap/Pagination"
import Container from "react-bootstrap/Container";
import he from 'he';
import { htmlToText } from 'html-to-text';

/* 
TODO:
*/

export default class Articles extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      articles: [],
      currentPage: 0,
      totalArticles: 0,
      maxPages: 0,
    };
  }
  setCurrentPage(page) {
    this.setState({currentPage: page});
    this.setArticles(page);
  }

  componentDidMount() {
    this.setArticles(0);
    this.totalArticles();
    // get the total number of articles
  }

  totalArticles = async () => {
    const response = await fetch('http://localhost:3000/articles/total');
    const jsonResponse = await response.json();
    const total = parseInt(jsonResponse);
    const max = Math.floor(total / 10);
    this.setState({totalArticles: total, maxPages: max});
  }
  setArticles = async (page) => {
    const response = await fetch(`http://localhost:3000/articles/${page}`, {mode: 'cors'})
    const jsonResponse = await response.json();
    this.setState({articles: [...jsonResponse]});
  }
  decidePagination = () => {
 /* okay what are the different scenarios: */
  // 1. on page 1
  const paginationStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
  if (this.state.currentPage === 0) {
    return (
      <Pagination style={paginationStyle}>
        <Pagination.Prev />
        <Pagination.Item onClick={() => this.setCurrentPage(0)}>{1}</Pagination.Item>
        <Pagination.Item onClick={() => this.setCurrentPage(1)}>{2}</Pagination.Item>
        <Pagination.Item onClick={() => this.setCurrentPage(2)}>{3}</Pagination.Item>
        <Pagination.Next onClick={() => this.setCurrentPage(1)}/>
      </Pagination>
    ) 
  }
  // 2. on a page before the last page
  else if (this.state.currentPage < this.state.maxPages) {
    return (
      <Pagination style={paginationStyle}>
        <Pagination.Prev onClick={() => this.setCurrentPage(this.state.currentPage - 1)}/>
        <Pagination.Item onClick={() => this.setCurrentPage(this.state.currentPage - 1)}>{this.state.currentPage}</Pagination.Item>
        <Pagination.Item onClick={() => this.setCurrentPage(this.state.currentPage)}>{this.state.currentPage + 1}</Pagination.Item>
        <Pagination.Item onClick={() => this.setCurrentPage(this.state.currentPage + 1)}>{this.state.currentPage + 2}</Pagination.Item>
        <Pagination.Next onClick={() => this.setCurrentPage(this.state.currentPage + 1)}/>
      </Pagination>
    )
  }
  // 3. on the last page
  else {
    return (
      <Pagination style={paginationStyle}>
        <Pagination.Prev onClick={() => this.setCurrentPage(this.state.currentPage - 1)}/>
        <Pagination.Item onClick={() => this.setCurrentPage(this.state.currentPage - 2)}>{this.state.currentPage - 1}</Pagination.Item>
        <Pagination.Item onClick={() => this.setCurrentPage(this.state.currentPage - 1)}>{this.state.currentPage}</Pagination.Item>
        <Pagination.Item onClick={() => this.setCurrentPage(this.state.currentPage)}>{this.state.currentPage + 1}</Pagination.Item>
        <Pagination.Next/>
      </Pagination>
    )
  }
}

  render() {
    // styles
    const containerStyle = {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      justifyContent: "center",
      alignItems: "center",
    }
    const outerDivStyle = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }
    const paginationStyle = {
      gridColumn: "1/ span 2", 
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "2rem",
    }
    const cardStyle = {
      width: "100%",
      height: "100%"
    }
    return (
      <div style={outerDivStyle}>  
        <Container fluid style={containerStyle}>
        {this.state.articles.map((article, index) => {
          let content = article.content
          content = he.decode(content)
          content = htmlToText(content, {wordwrap: null})
          content = content.slice(0, 20);
          return (
            <Card style={cardStyle} key={index}>
            <Card.Body>
              <Card.Title>{article.title}</Card.Title>
              <Card.Text>
                {`${content}...`}
              </Card.Text>
              <a href={`/article/${article._id}`}>Read</a>
            </Card.Body>
          </Card>
          )
        })}
        <Pagination style={paginationStyle}>
          <Pagination.First onClick={() => this.setCurrentPage(0)}/>
          {this.decidePagination()}
          <Pagination.Last onClick={() => this.setCurrentPage(this.state.maxPages)}/>
          </Pagination>
        </Container>
      </div>
    )
  }
}