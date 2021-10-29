import React from 'react'
import { Row, Col, Button, Container, Card, CardDeck } from 'react-bootstrap'
import PropTypes, { string } from 'prop-types'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { render } from 'react-dom'
import FavoriteMovies from './favorite-movies/favorite-movies'
import UserInfo from './user-info/user-info'
import UpdateUser from './update-user'
import { MainView } from '../main-view/main-view'
import axios from 'axios'

// const express = require('express'),
// bodyParser = require('body-parser'),
// uuid= require('uuid');
// const app = express();

export class ProfileView extends React.Component {
  constructor() {
    super()
    this.state = {
      username: null,
      password: null,
      email: null,
      birthDate: null,
      favoriteMovies: [],
      movies: [],
    }
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token')
    this.getUser(accessToken)
  }

  getUser(token) {
    let url =
      'https://edmund-movie-api.herokuapp.com/users/' +
      localStorage.getItem('user')
    axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data)
        this.setState({
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          birthday: new Date(response.data.Birthday).toLocaleDateString(),
          favoriteMovies: response.data.FavoriteMovies,
        })
      })
  }


  removeFavorite(_id) {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');

    console.log(_id, '_id')
    axios.delete(`https://edmund-movie-api.herokuapp.com/users/${Username}/movies/${movie_id}` , {
  
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => {
      alert ('Favorite was removed')
      window.location.reload(); 

    })
    .catch(function (error) {
      console.log(error);
    })
  }
  
  
  render() {
    const { movies } = this.props
    const { username, email, Birthday} = this.state
    const favoriteMovieList = movies.filter((movie) => {
      return this.state.favoriteMovies.includes(movie._id)
    })
    console.log(this.state.favoriteMovies)

    
    return (
      <Container>
        <Row>
          <Col xs={12} sm={4}>
            <Card>
              <Card.Body>
                <UserInfo name={username} email={email} Birthday={Birthday}/>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} sm={8}>
            <Card>
              <Card.Body>
                {/* <UpdateUser
                handleUpdate={handleUpdate}
                handleSubmit={handleSubmit}
                /> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <CardDeck>
            {favoriteMovieList.length > 0 &&
              favoriteMovieList.map((movie) => {
                return (
                  <Card key={movie._id} className='fav-card mt-2'>
                    <Link to={`/movies/${movie._id}`}>
                      <Card.Img id='poster' src={movie.ImagePath} />
                    </Link>
                     <Card.Title className="movie-card-title">{movie.title}</Card.Title>
                    <Button
                      className='remove font-weight-bold mt-2'
                      id='remove'
                      onClick={() => this.removeFavorite(_id)}
                    >
                      Remove
                    </Button>
                  </Card>
                )
              })}
          </CardDeck>
        </Row>
        {/* <FavoriteMovies favoriteMovieList={favoriteMovieList} /> */}
      </Container>
    )
  }
}