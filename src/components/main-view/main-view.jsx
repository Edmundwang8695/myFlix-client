import React from "react";
import axios from "axios";

import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { RegistrationView } from "../registration-view/registration-view";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { ProfileView } from "../profile-view/profile-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import FavoriteMovies from "../profile-view/favorite-movies/favorite-movies";
export class MainView extends React.Component{
  //to have a default state.
        constructor(){
          super();
          this.state = {
            movies: [],
            selectedMovie:null,
            user:null,
            register:false,
            email:'',
            FavoriteMovies:[]
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
            this.setState({
              user:authData.user,
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
  // getUsers(token) {
  //   axios.post('https://edmund-movie-api.herokuapp.com/users', {
  //     headers: { Authorization: `Bearer ${token}` }
  //   })
  //     .then(response => {
  //       // Assign the result to the state
  //       this.setState({
  //         users: response.data
  //       });
  //       console.log(response)
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  render() {
    const { movies, user, navigation } = this.state;
    console.log(user)
    if (!user) return <Row>
      <Col>
        <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
      </Col>
    </Row>
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Router>
        <NavigationBar navigation={navigation} user={user} />
​
        <Row className="main-view justify-content-md-center">
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <Col className="login-view">
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return movies.map(m => (
                <Col md={3} key={m._id}>
                  <MovieCard movieData={m} />
                </Col>
              ))
            }}
          />
        <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return movies.map(m => (
              <Col md={3} key={m._id}>
                <MovieCard movieData={m} />
              </Col>
            ))
          }} />
          <Route path="/movies/:movieId" render={({ match }) => {
            return <Col md={8}>
              <MovieView movieData={movies.find(m => m._id === match.params.movieId)} />
            </Col>
          }} />
          <Route path="/directors/:name" render={({ match , history }) => {
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
               <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director}
               onBackClick={() => history.goBack()} />
            </Col>
             }
          } />
          <Route exact path="/" render={() => {
              if (!user) return <Col>
               <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
           </Col>
              return movies.map(m => (
                <Col md={3} key={m._id}>
                 <MovieCard movieData={m} />
              </Col>
               ))
              }} />
​
         <Route path="/register" render={() => {
           if (user) return <Redirect to="/" />
             return <Col>
           <RegistrationView />
            </Col>
            }} />
            
           <Route path="/profile" render={() => {
            if (!user) return <Col>
              <ProfileView />
            </Col>
          }} />
​
            <Route
            exact
            path="/users/:username"
            render={({ history }) => {
              if (!user)
                return (
                  <Col className="login-view">
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return <ProfileView 
              history={history} 
              movies={movies} 
              user={user} 
              />;
            }}
          />
​
          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />
        </Row>
      </Router>
    );
  }
}