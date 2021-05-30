import React from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
  onRegister(register) {
    this.setState({
      register
    });
  }

  onBackClick() {
    this.setState({
      selectedMovie: null
    });
  }

  toggleRegister = (e) => {
    e.preventDefault();
    this.setState({
      register: !this.state.register
    })
  }

  render() {
    const { movies, selectedMovie, register } = this.state;

    //if no user logged in - LoginView rendered//
    //if user logs in, user details are passed as prop to LoginView//
    if (register) return (
      <Row className="justify-content-md-center">
        <Col md={8}>
          <RegistrationView onRegister={register => this.onRegister(register)} toggleRegister={this.toggleRegister} />
        </Col>
      </Row>
    );

    if (this.state.user === null)
      return (
        <Row className="justify-content-md-center">
          <Col md={8}>
            <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} toggleRegister={this.toggleRegister} />
          </Col>
        </Row>
      );

    //before movies loaded//
    if (movies.length === 0) return <div className="main-view" />;

    //if state of 'selectedMovie' not null, that specific movie is returned, otherwise list of all movies returned//
    return (
      <Row className="main-view justify-content-md-center">
        {selectedMovie
          ? (
            <Col md={10}>
              <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
            </Col>
          )
          : movies.map(movie => (
            <Col md={4}>
              <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }} />
            </Col>
          ))
        }
      </Row>
    );
  }
}
