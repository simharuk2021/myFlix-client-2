import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { setMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

import { Link } from "react-router-dom";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Navbar } from 'react-bootstrap';

import './main-view.scss';

// import fantasticbeastsImage from 'url:../../img/fantastic.jpg';
import videoLogo from 'url:../../img/video.svg';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      register: false
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
      this.getUsers(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://myflix-movie-api-2312.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUsers(token) {
    axios.get('https://myflix-movie-api-2312.herokuapp.com/users', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        this.setState({
          users: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
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
    let { movies } = this.props;
    let { user } = this.state;

    return (
      <Router>
        <div className="main-view justify-content-md-center">
          <Navbar className="mb-5" id="myFlixNav" variant="dark" expand="lg"
            sticky="top">
            <Navbar.Brand id="appName" href="#home">
              <img
                alt=""
                src={videoLogo}
                width="50"
                height="50"
                className="d-inline-block align-top"
              />{' '}myFlix
            </Navbar.Brand>
            <Navbar.Toggle id="toggle" />
            <Navbar.Collapse id="toggle" className="justify-content-end">
              {!user ? (
                <ul>
                  <Link to={'/'}>
                    <Button id="link" variant="link">Log In</Button>
                  </Link> {''}
                  <Link to={'/register'}>
                    <Button id="link" variant="link">Register</Button>
                  </Link>
                </ul>
              ) : (
                <ul>
                  <Link to={'/users/${users}'}>
                    <Button id="link" variant="link">My Account</Button>
                  </Link>
                  <Link to={'/'}>
                    <Button id="link" variant="link">Movies</Button>
                  </Link>{''}
                  <Link to={'/'}>
                    <Button id="logout" variant="outline-warning" onClick={() => this.onLoggedOut()}>Log Out</Button>
                  </Link>
                </ul>
              )}
            </Navbar.Collapse>
          </Navbar>

          <Row className="main-view justify-content-md-center">
            <Route exact path="/" render={() => {
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <MoviesList movies={movies} />;
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
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                </Col>
              if (!movies) return <div className="main-view" />;
              return <Col md={5}>
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
            <Route exact path="/users/:username" render={({ history }) => {
              if (this.state.user === null)
                return <Col md={12}>
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} toggleRegister={this.toggleRegister} />
                </Col>
              if (!movies) return <div className="main-view" />;
              return <Col>
                <ProfileView onLoggedIn={(user) => this.onLoggedIn(user)} movies={movies} onBackClick={() => history.goBack()} />
              </Col>
            }} />
          </Row>
        </div>
      </Router >
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);

