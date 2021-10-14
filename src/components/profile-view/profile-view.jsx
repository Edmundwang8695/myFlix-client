import React from 'react';
import {Row, Col, Button, Container, Card } from 'react-bootstrap';
import PropTypes, { string } from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

export class profileView extends React.Component{
    constructor(){
        super();
    this.state ={
        username:null,
        password:null,
        email:null,
        birthday:null,
        favorites:[],
    }
}

componentDidMount(){
    let accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
}

getUsers(token) {
    const username = localStorage.getItem('user');
    axios.post('https://edmund-movie-api.herokuapp.com/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
            Name: response.data.Name,
            Username: response.data.Username,
            Password: response.data.Password,
            Email: response.data.Email,
            Birthday: response.data.Birthdate,
            FavoriteMovies: response.data.FavoriteMovies,
        });
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });
  }


removeFavoriteMovie(){ 
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');

    axios.delete('https://edmund-movie-api.herokuapp.com/users/:username/movies/:movieId', {
        headers:{ Authorization:`Bearer ${token}`},
    })
    .then(() =>{
        alert('Movie removed');
        this.componentDidMount();
    })
    .catch(function (error) {
        console.log(error);
    })
 }

 handleUpdate(e, newName, newUsername, newPassword, newEmail, newBirthday) {
    this.setState({
      validated: null,
    });

    const form = e.currentTarget;
    e.preventDefault();

    const token = localStorage.getItem('item');
    const username = localStorage.getItem('user');

    axios.put('https://edmund-movie-api.herokuapp.com/users/:Username')
}