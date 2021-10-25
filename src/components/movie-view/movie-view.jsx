import React from "react";
import {Row, Col, Button, Container, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from "axios";
import { Card } from "react-bootstrap";

export class MovieView extends React.Component{

  handleAdd(movie) {
    const token = localStorage.getItem("token");
    const Username = localStorage.getItem("user");
    axios.post(`https://edmund-movie-api.herokuapp.com/users/${Username}/movies/${movie._Id}`, {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        console.log(response);
        alert(movie.Title + " has been added to your favorites!");
      })
  }
    render(){
        const { onBackClick, movieData } = this.props;

        return (
            <Container>
            <div className="movie-view-wrapper ml-5 mt-3">
              <Row>
                <Card>
                  <img className="img-fluid" alt="Responsive image" src={movieData.ImagePath} />
                </Card>
              </Row>
              <Row>
                <span className="meta-text">Genre: <Link to={`/genres/${movieData.Genre.Name}`}>{movieData.Genre.Name}</Link></span>
              </Row>
              <Row>
                <span className="meta-text">Directed by: <Link to={`/directors/${movieData.Director.Name}`}>{movieData.Director.Name}</Link></span>
              </Row>
              <Row  className="text-black">
                <h1>{movieData.Title}</h1> 
                <p className="movie-description">{movieData.Description}</p>
                
                <div className="back-btn"> 
                  <Button block type="button" variant="warning" onClick={() => {onBackClick(null);}}>Back</Button>
                </div>
                <div className="favorite-buttons">
                    <Button block type="button" variant="success" onClick={() => this.handleAdd(movieData)}>Add to favorites</Button>
                </div>
              </Row>
            </div>
          </Container>
        );
      }
    }
// MovieView.propTypes = {
//     movieData: PropTypes.shape({
//       Title: PropTypes.string.isRequired,
//       Description: PropTypes.string.isRequired,
//       ImagePath: PropTypes.string.isRequired
//     }).isRequired
//   };