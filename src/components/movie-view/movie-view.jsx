import React from "react";
import {Row, Col, Button, Container, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export class MovieView extends React.Component{

  handleAdd() {
    const token = localStorage.getItem("token");
    const Username = localStorage.getItem("user");
    axios.post(`https://edmund-movie-api.herokuapp.com/users/${Username}/movies/${this.props.movie._id}`, {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        console.log(response);
        alert(this.props.movie.Title + " has been added to your favorites!");
      })
  }
    render(){
        const {movieData , onBackClick } = this.props;

        return (
            <>
            <div className="movie-view-wrapper ml-5 mt-3">
              <Row>
                <div>
                  <img variant="top" src={movieData.ImagePath} />
                </div>
              </Row>
              <Row>
                <span className="meta-text">Genre: <Link to={`/genre/${movieData.Genre.Name}`}>{movieData.Genre.Name}</Link></span>
              </Row>
              <Row>
                <span className="meta-text">Directed by: <Link to={`/directors/${movieData.director.name}`}>{movieData.director.name}</Link></span>
              </Row>
              <Row  className="text-white">
                <h1>{movieData.Title}</h1>
                <p className="movie-description">{movieData.Description}</p>
                <div className="back-btn">
                  <Button className="lg" variant="primary" onClick={() => {onBackClick(null);}}>Back to Movies</Button>
                </div>
                <div className="favorite-buttons">
                  <Link to={`/movies/${movieData.Title}`}>
                    <Button block type="button" variant="success" onClick={() => this.handleAdd(movie)}>Add to favorites</Button>
                  </Link>
                  <ToastContainer />
                </div>
                <div className="favorite-buttons">
                  <Link to={`/movies/${movieData.Title}`}>
                    <Button block type="button" variant="danger" onClick={() => this.handleRemove(movie)}>Remove from favorites</Button>
                  </Link>
                </div>
              </Row>
            </div>
          </>
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