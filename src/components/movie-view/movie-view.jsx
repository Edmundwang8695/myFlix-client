import React from "react";
import PropTypes from "prop-types";

export class MovieView extends React.Component{

    componentDidMount(){
        document.addEventListener('keypress',event=>{
            console.log(event.key);
        });
    }
    render(){
        const {movieData , onBackClick } = this.props;

        return (
            <div className="movie-view">
                <div className="movie-poster">
                    <img src={movieData.ImagePath} />
                </div>
                <div className="movie-title">
                    <span className="lable">Title: </span>
                    <span className="value"> {movieData.Title}</span>
                </div>
                <div className="movie-description">
                    <span className="lable">Description: </span>
                    <span className="value">{movieData.Description}</span>
                </div>
                <div className="director">
                    <span className="lable">Director: </span>
                    <span className="value">{movieData.Director.Name}</span>
                </div>
                <button onClick={() => { onBackClick(null); }}>Back</button>
            </div>
        );
    }
}
MovieView.propTypes = {
    movieData: PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired
    }).isRequired
  };