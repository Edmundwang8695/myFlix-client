import React from "react";
import axios from "axios";

import { BrowserRouter as Router, Route } from "react-router-dom";

import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class MainView extends React.Component{
  //to have a default state.
        constructor(){
          super();
          this.state = {
            movies: [],
            selectedMovie:null,
            user:null,
            register:false
          };
        }

        componentDidMount() {
          let accessToken = localStorage.getItem('token');
          if (accessToken !== null) {
            this.setState({
              user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
          }
        }

        /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
        setSelectedMovie(movie) {
          this.setState({
            selectedMovie: movie,
          });
        }

        onRegistration(register) {
          this.setState({
            register,
          });
        }
          /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
          onLoggedIn(authData) {
            console.log(authData);
            this.state({
              user:authData.user.Username
            });

            localStorage.setItem('token',authData.token);
            localStorage.setItem('user',authData.user.Username);
            this.getMovies(authData.token);
          }

          getMovies(token){
            axios.get('https://edmund-movie-api.herokuapp.com/movies',{
              headers: { Authorization: `Bearer ${token}`}
            })
            .then(response =>{
              //assign result to state
              this.setState({
                movies:response.data
              });
            })
            .catch(function (error){
              console.log(error);
            });
          }
          
            //  Get user data from DB
  getUsers(token) {
    axios.post('https://edmund-movie-api.herokuapp.com/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          users: response.data
        });
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  render() {
    const { movies, user } = this.state;

    if (!user) return <Row>
      <Col>
        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
      </Col>
    </Row>
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Router>
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />
          <Route path="/movies/:movieId" render={({ match }) => {
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} />
            </Col>
          }} />
          <Route path="/directors/:name" render={({ match }) => {
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
               <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} />
            </Col>
             }
          } />

        </Row>
      </Router>
    );
  }
}