import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";

import { connect } from 'react-redux';

import { setUser } from '../../actions/actions';

import { Link } from "react-router-dom";

import { Card, FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import trashImg from 'url:../../img/trash.svg';

import './profile-view.scss';

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validated: null
    };
    console.log('Profile View Loaded');
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(e, newUsername, newPassword, newEmail, newBirthday) {
    this.setState({
      validated: null,
    });

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        validated: true,
      });
      return;
    }
    e.preventDefault();

    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const url = 'https://myflix-movie-api-2312.herokuapp.com/users/';

    axios({
      method: 'put',
      url: url + user,
      headers: { Authorization: `Bearer ${token}` },
      data: {
        Username: newUsername ? newUsername : this.state.Username,
        Password: newPassword ? newPassword : this.state.Password,
        Email: newEmail ? newEmail : this.state.Email,
        Birthday: newBirthday ? newBirthday : this.state.Birthday,
      },
    })
      .then(response => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });
        alert(this.state.Username + ' changes have been saved!');
        localStorage.setItem('user', this.state.Username);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(input) {
    this.Username = input;
  }

  setPassword(input) {
    this.Password = input;
  }

  setEmail(input) {
    this.Email = input;
  }

  setBirthday(input) {
    this.Birthday = input;
  }


  removeFavorite(movie) {
    const token = localStorage.getItem("token");
    axios
      .delete("https://myflix-movie-api-2312.herokuapp.com/users/" +
        localStorage.getItem("user") + "/favorites/" + movie._id,
        {
          headers: { Authorization: `Bearer ${token}` },
        })
      .then((response) => {
        console.log(response);
        location.reload();
        alert(movie.Title + " has been removed from your Favorites.");
      });
  }
  handleDelete() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    axios.delete(
      `https://myflix-movie-api-2312.herokuapp.com/users/${user}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then(() => {
        alert(user + " account has been deleted.");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.pathname = "/";
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movies, user } = this.props;
    const { validated } = this.state;
    const FavoriteMovieList = movies.filter(movie => {
      return user.FavoriteMovies.includes(movie._id);
    });


    return (

      <div className="flexWrap">
        <Row>
          <Col md={6}>

            <div id="userForm">

              <Form noValidate validated={validated} className='update-form' onSubmit={(e) => this.handleUpdate(e, this.Username, this.Password, this.Email, this.Birthday)}>

                <h4>Update your Profile</h4>
                <Form.Group controlId="BasicUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control type="text"
                    placeholder={user.Username}
                    autoComplete="username"
                    onChange={(e) => this.setUsername(e.target.value)}
                    pattern='[a-zA-Z0-9]{5,}'
                    minLength="5" />
                  <Form.Control.Feedback type='invalid'>Enter a Username with at least 5 characters (no speacial characters)</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="BasicPassword">
                  <Form.Label>Password:*</Form.Label>
                  <Form.Control type="password"
                    placeholder="Enter current or new Password"
                    autoComplete="password"
                    onChange={(e) => this.setPassword(e.target.value)} minLength="5" required />
                  <Form.Control.Feedback type='invalid'>Enter a valid password with at least 5 characters</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="BasicEmail">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control type="email"
                    placeholder={user.Email}
                    autoComplete="email"
                    onChange={(e) => this.setEmail(e.target.value)} />
                  <Form.Control.Feedback type='invalid'>Please enter a valid email address.</Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="BasicBirthday">
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control type="date"
                    onChange={(e) => this.setBirthday(e.target.value)} />
                  <Form.Control.Feedback type='invalid'>Please enter a valid date.</Form.Control.Feedback>
                </Form.Group>
                <Button variant="outline-warning" block type="submit">Update</Button>
              </Form>

              <br />
              <Button variant="outline-warning" block onClick={() => this.handleDelete()}>Delete Account</Button>
              <br />
            </div>
          </Col>







          <Col md={6} >

            <div id="favoriteMovies">

              <h4>Your Favorite Movies:</h4>
              {FavoriteMovieList.map((movie) => {
                return (
                  <Card id="card" className="movie-card mb-2" text="white">
                    <Card.Img variant="top" src={movie.PosterPath} />
                    <Card.Body>
                      <Link to={`/movies/${movie._id}`} id="link">
                        {movie.Title}
                      </Link>
                      <button type="button" className="btn btn-white btn-rounded mr-md-3 z-depth-1a">
                        <img id="trash-img"
                          alt=""
                          src={trashImg}
                          width="20"
                          height="20"
                          fluid="true"
                          onClick={() => this.removeFavorite(movie)}
                        />
                      </button>

                    </Card.Body>
                  </Card>
                );

              })}

            </div>
          </Col>

        </Row>

      </div >
    );
  }
}

ProfileView.propType = {
  movies: PropTypes.array.isRequired
};

