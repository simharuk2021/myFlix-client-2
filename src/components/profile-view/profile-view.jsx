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
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     UsernameError: "",
  //     PasswordError: "",
  //     EmailError: "",
  //     BirthdayError: ""
  //   };
  // }

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
  handleUpdate() {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");

    // let setisValid = this.formValidation();
    // if (setisValid) {
    axios.put(`https://myflix-movie-api-2312.herokuapp.com/users/${user}`, {
      Username: this.state.Username,
      Password: this.state.Password,
      Email: this.state.Email,
      Birthday: this.state.Birthday
    },
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        const data = response.data;
        localStorage.setItem("user", data.user);
        console.log(data);
        alert(user + "account has been updated.");
        console.log(res);
      })
      .catch(function (err) {
        console.log(err.response.data);
      });
  }

  // formValidation() {
  //   const userData = localStorage.getItem("user");
  //   console.log("formvalidation", user);
  //   let UsernameError = {};
  //   let EmailError = {};
  //   let PasswordError = {};
  //   let BirthdayError = {};
  //   let isValid = true;
  //   if (user.Username.trim().length < 5) {
  //     UsernameError.usernameShort = "Username be alphanumeric characters only and contains at least 5 characters";
  //     isValid = false;
  //   }
  //   if (user.Password.trim().length < 3) {
  //     PasswordError.passwordMissing = "You must enter a password.(minimum 4 characters) ";
  //     isValid = false;
  //   }
  //   if (!(user.Email && user.Email.includes(".") && user.Email.includes("@"))) {
  //     EmailError.emailNotEmail = "A valid email address is required.";
  //     isValid = false;
  //   }
  //   if (user.birthday === '') {
  //     BirthdayError.birthdayEmpty = "Please enter your birthday.";
  //     isValid = false;
  //   }
  //   this.setState({
  //     UsernameError: UsernameError,
  //     PasswordError: PasswordError,
  //     EmailError: EmailError,
  //     // ConfirmPasswordError: ConfirmPasswordError,
  //     BirthdayError: BirthdayError,
  //   })
  //   return isValid;
  // };

  handleChange(e) {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  render() {
    const { movies, user } = this.props;
    console.log("render ProfileView", user);
    const FavoriteMovieList = movies.filter(movie => {
      return user.FavoriteMovies.includes(movie._id);
    });


    return (

      <div className="flexWrap">
        <Row>
          <Col md={6}>

            <div id="userForm">

              <Form className="profile-details-form">
                <h4>User Profile:</h4>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control type="text" name="Username"
                    value={user.Username}
                    onChange={(e) => this.handleChange(e)}
                    placeholder="Change Username"
                    pattern='[a-zA-Z0-9]{5,}' />
                  <Form.Control.Feedback type='invalid'>Please enter a valid username with at least 5 alphanumeric characters.</Form.Control.Feedback>

                  <Form.Text id="usernameHelpBlock" muted>
                    Username must be a minimum of 5 characters
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formPassword">
                  <Form.Label>Password: </Form.Label>
                  <FormControl type="password" name="Password"
                    onChange={(e) => this.handleChange(e)}
                    placeholder="Change Your Password"
                    pattern='.{5,}' />
                  <Form.Control.Feedback type='invalid'>Please enter a valid password with at least 5 characters.</Form.Control.Feedback>

                  <Form.Text id="passwordHelpBlock" muted>
                    Password must be a minimum of 4 characters
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control type="email" name="Email"
                    value={user.Email}
                    onChange={(e) => this.handleChange(e)} />
                  <Form.Control.Feedback type='invalid'>Please enter a valid email address.</Form.Control.Feedback>

                </Form.Group>
                <Form.Group controlId="formBirthday">
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control type="date" name="Birthday"
                    onChange={(e) => this.handleChange(e)} />
                  <Form.Control.Feedback type='invalid'>Please enter a valid birthday.</Form.Control.Feedback>

                </Form.Group>
                <Link to={`/users/${user.Username}`}>
                  <Button id="save-btn" variant="outline-warning" block onClick={() => this.handleUpdate()}>Save Changes</Button>
                </Link>
              </Form>
              <br />
              <Button variant="outline-warning" block onClick={() => this.handleDelete()}>Delete Account</Button>
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

