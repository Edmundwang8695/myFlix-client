import React from "react";
import axios from "axios";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export class MainView extends React.Component{
  //to have a default state.
        constructor(){
          super();
          this.state = {
            movies: [
              // { _id: 1, Title: 'Silence of the Lambs', Description: 'A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.', Director:"Jonathan Demme", ImagePath: "https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg"},
              // { _id: 2, Title: 'Black Widow', Description: 'A film about Natasha Romanoff in her quests between the films Civil War and Infinity War',Director:"Cate Shortland", ImagePath: 'https://th.bing.com/th/id/R.404727dfbe3c7223503ad0d64fe60771?rik=c4QS5FDTlo91Eg&riu=http%3a%2f%2fwww.loucademiadecinema.com.br%2fwp-content%2fuploads%2f2020%2f04%2fblack-widow-5e667a3ea6e0f.jpg&ehk=A1LcBcqXOEpY3RDZ1jkxwt9ku%2fvzkPv5ZorB2F%2b22Hw%3d&risl=&pid=ImgRaw'},
              // { _id: 3, Title:"Berlin Syndrome",Description:"update A passionate holiday romance leads to an obsessive relationship, when an Australian photojournalist wakes one morning in a Berlin apartment and is unable to leave.", Director:"Cate Shortland",ImagePath:"https://images-na.ssl-images-amazon.com/images/I/91J7hZMz+sL.jpg"}
            ],
            selectedMovie:null
          };
        }

        componentDidMount(){
          axios.get('https://edmund-movie-api.herokuapp.com/')
          .then(Response =>{
            this.setState({
              movies:Response.data
            });
          })
          .catch(error => {
            console.log(error);
          });
        }
        setSelectedMovie(newSelectedMovie) {
            this.setState({
              selectedMovie: newSelectedMovie
            });
          }
          render() {
            const { movies, selectedMovie } = this.state;


            if (movies.length === 0) return <div className="main-view" />;
        
            return (
              <div className="main-view">
                {selectedMovie
                  ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                  : movies.map(movie => (
                    <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
                  ))
                }
              </div>
            );
          }
}