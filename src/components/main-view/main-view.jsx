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

// creates a variable and imports the icon
import videoLogo from 'url:../../img/2215481_camera_film_icon.svg';

//creates a class based component which is imported and re-used in other components
export class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      register: false
    };
  }
//mounts the component once an authenticated user is within local storage
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUsers(accessToken, localStorage.getItem('user'));
      this.getMovies(accessToken);
    }
  }

//makes a call to the user endpoint to search through the users and assign the logged in user to state
  getUsers(token, username) {
    const url = "https://my-movies-souperapp.herokuapp.com/users/" + username;
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

//makes a call to retrieve all of the movies from the API
  getMovies(token) {
    axios.get('https://my-movies-souperapp.herokuapp.com/movies', {
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

//logic which removes the user from local storage and returns to the login page
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.open("/", "_self");
    this.setState({
      user: null
    });
  }
//logic which sets registration details to state
  onRegister(register) {
    this.setState({
      register
    });
  }

//logic which sets the movies and user as properties
  render() {
    let { movies, user } = this.props;
    console.log("render", user);

//creates a navbar which creates movies, account and log out functionality which is re-used across other relevant components    
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
                    <Button id="logout" variant="outline-success" onClick={() => this.onLoggedOut()}>Log Out</Button>
                  </Link>
                </ul>
              )}
            </Navbar.Collapse>
          </Navbar>

{/* defines route paths which are used to make calls to the API and retrieve data and toggle relevant views */}
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

