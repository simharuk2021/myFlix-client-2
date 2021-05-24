import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

// import fantasticbeastsImage from 'url:../../img/fantastic.jpg';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount() {
    axios.get('https://myflix-movie-api-2312.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  //when movie clicked, this function updates state of 'selectedMovie' property to that movie//
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  //when user successfully logs in - function updates 'user' property in state to that particular user//
  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  //when user successfully regsiters - function updates 'user property in state to that partcular user//
  onRegsister(register) {
    this.setState({
      register
    });
  }

  onBackClick() {
    this.setState({
      selectedMovie: null
    });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    //if no user logged in - LoginView rendered//
    //if user logs in, user details are passed as prop to LoginView//
    if (!user) return <LoginView onLoggedIn={user =>
      this.onLoggedIn(user)} />;

    if (!register) return <RegistrationView onRegister={register => this.onRegister(register)} />;

    //before movies loaded//
    if (movies.length === 0) return <div className="main-view" />;

    //if state of 'selectedMovie' not null, that specific movie is returned, otherwise list of all movies returned//
    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }} />
          ))
        }
      </div>
    );
  }
}
