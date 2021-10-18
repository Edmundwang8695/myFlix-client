import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

export class MovieCard extends React.Component {
  render() {
    const { movieData, onMovieClick } = this.props;

    return (
      <Card>
        <Card.Img variant="top" src= {movieData.ImagePath} />
        <Card.Body>
          <Card.Title>{movieData.Title}</Card.Title>
          <Card.Text>{movieData.Description} </Card.Text>
          <Link to={`/movies/${movieData.Title}`}>
          <Button variant="link"> Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

// MovieCard.propTypes = {
//   movieData: PropTypes.shape({
//     ImagePath: PropTypes.string.isRequired,
//     Title: PropTypes.string.isRequired,
//     Description: PropTypes.string.isRequired,
//     Director: PropTypes.string.isRequired,
//   }).isRequired,
//   onMovieClick: PropTypes.func.isRequired
// };