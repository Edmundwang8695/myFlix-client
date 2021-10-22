import React from 'react';
import {Row, Col, Button, Container, Card } from 'react-bootstrap';
import PropTypes, { string } from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';
import FavoriteMovies from './favorite-movies/favorite-movies';
import UserInfo from "./user-info/user-info";
import UpdateUser from './update-user';

export function ProfileView({ movies, onUpdatedUserInfo }) {
  const Username = localStorage.getItem("user");
  const email = localStorage.getItem('email');
  const password = localStorage.getItem('password')

  const favoriteMovieList = movies.filter((movies) => {});


  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // console.log(Username, Password);
  //   // send a request to the server for authentication
  //   axios.post("https://edmund-movie-api.herokuapp.com/login", {
  //       Username: Username,
  //       Password: password,
  //     })
  //     .then((response) => {
  //       const data = response.data;
  //       props.onLoggedIn(data);
  //     })
  //     .catch((e) => {
  //       console.log("no such user");
  //     });
  // };


  const handleUpdate = (e) => {};



  return (
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              <UserInfo name={Username} email={email}/>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={8}>
          <Card>
            <Card.Body>
              <UpdateUser
                handleUpdate={handleUpdate}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <FavoriteMovies favoriteMovieList={favoriteMovieList} />
    </Container>
  );
}