import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { NavbarBrand } from 'react-bootstrap';

// import fantasticbeastsImage from 'url:../../img/fantastic.jpg';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: false
    };
  }

  getMovies(token) {
    axios.get('https://myflix-movie-api-2312.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
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

  //when movie clicked, this function updates state of 'selectedMovie' property to that movie//
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  //when user successfully logs in - function updates 'user' property in state to that particular user - keep authData in localStorage//
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }
  //need to add Button for log out : onClick={()={this.onLoggedOut()}}

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
    this.setState({
      register: !this.state.register
    })
  }

  render() {
    const { movies, user } = this.state;

    return (
      <Router>
        <Row className="main-view justify-content-md-center">
          <Route exact path="/" render={() => {
            if (this.state.user === null)
              return <Col>
                <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
              </Col>
            if (!movies) return <div className="main-view" />;
            return movies.map(m => (
              <Col md={4} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />
          <Route path="/register" render={() => {
            if (this.state.user) return <Redirect to="/" />
            return <Col>
              <RegistrationView onRegister={register => this.onRegister(register)} />
            </Col>
          }} />
          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (this.state.user === null)
              return <Col>
                <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} toggleRegister={this.toggleRegister} />
              </Col>
            if (!movies) return <div className="main-view" />;
            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />
          <Route exact path="/genres/:name" render={({ match, history }) => {
            if (this.state.user === null)
              return <Col>
                <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} toggleRegister={this.toggleRegister} />
              </Col>
            if (!movies) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />
          <Route path="/directors/:name" render={({ match, history }) => {
            if (this.state.user === null)
              return <Col>
                <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} toggleRegister={this.toggleRegister} />
              </Col>
            if (!movies) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }
          } />

        </Row>
      </Router>
    );
  }
}

