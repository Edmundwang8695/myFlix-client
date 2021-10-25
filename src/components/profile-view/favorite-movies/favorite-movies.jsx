import React from "react";
import { Link } from "react-router-dom";

import {Button, Row, Col, Figure, Card,} from "react-bootstrap";


function FavoriteMovies({ favoriteMovieList }) {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={12}>
            <h4>Favorite Movies</h4>
          </Col>
        </Row>
        <Row>
          {favoriteMovieList.map(({movie}) => {
            return (
              <Col xs={12} md={6} lg={3} key={_id} className="fav-movie">
                  <img  src={movie.ImagePath} />
                <Figure>
                  <Link to={`/movies/${movie._id}`}>
                    <h4>{movie.Title}</h4>
                  </Link>
                </Figure>

                <Button
                  variant="secondary"
                  onClick={() => removeFav(movies._id)}
                >
                  Remove
                </Button>
              </Col>
            );
          })}
        </Row>
      </Card.Body>
    </Card>
  );
}

export default FavoriteMovies;