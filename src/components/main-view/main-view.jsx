import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { setMovies } from '../../actions/actions';
import { setUser } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import ProfileView from '../profile-view/profile-view';



import { Link } from "react-router-dom";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Navbar } from 'react-bootstrap';

import './main-view.scss';

import videoLogo from 'url:../../img/video.svg';

export class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      register: false
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUsers(accessToken, localStorage.getItem('user'));
      this.getMovies(accessToken);
    }
  }

  getUsers(token, username) {
    const url = "https://myflix-movie-api-2312.herokuapp.com/users/" + username;
    axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        //assign the result to this state
        this.props.setUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
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

  //when user successfully logs in - function updates 'user' property in state to that particular user - keep authData in localStorage//
  onLoggedIn(authData) {
    console.log(authData);
    this.props.setUser(authData.user);

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

  onRegister(register) {
    this.setState({
      register
    });
  }

  render() {
    let { movies, user } = this.props;
    console.log("render", user);

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
              return <MoviesList movies={movies} user={user} />;
            }} />

            <Route path="/register" render={() => {
              if (user) return <Redirect to="/" />
              return <Col>
                <RegistrationView onRegister={register => this.onRegister(register)} />
              </Col>
            }} />

            <Route path="/movies/:movieId" render={({ match, history }) => {
              if (!user)
                return <Col>
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} toggleRegister={this.toggleRegister} />
                </Col>
              if (!movies) return <div className="main-view" />;
              return <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route exact path="/genres/:name" render={({ match, history }) => {
              if (!user)
                return <Col>
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                </Col>
              if (!movies) return <div className="main-view" />;
              return <Col md={5}>
                <GenreView
                  genre={movies.find(m => m.Genre.Name === match.params.name).Genre}
                  movies={movies}
                  onBackClick={() => history.goBack()} />
              </Col>
            }
            } />

            <Route path="/directors/:name" render={({ match, history }) => {
              if (!user)
                return <Col>
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} toggleRegister={this.toggleRegister} />
                </Col>
              if (!movies) return <div className="main-view" />;
              return <Col md={8}>
                <DirectorView
                  director={movies.find(m => m.Director.Name === match.params.name).Director}
                  movies={movies}
                  onBackClick={() => history.goBack()} />
              </Col>
            }
            } />

            <Route exact path="/users/:username" render={({ history }) => {
              if (!user)
                return <Col md={12}>
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} toggleRegister={this.toggleRegister} />
                </Col>
              if (!movies) return <div className="main-view" />;
              return <Col>
                <ProfileView
                  user={user}
                  movies={movies}
                  // movie={movies.find(m => m._id === match.params.movieId)}
                  onBackClick={() => history.goBack()} />
              </Col>
            }} />
          </Row>
        </div>
      </Router >
    );
  }
}

let mapStateToProps = state => {
  return {
    movies: state.movies,
    user: state.user
  }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);

