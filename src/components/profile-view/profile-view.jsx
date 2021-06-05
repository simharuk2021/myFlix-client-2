import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
// import moment from 'moment';

import { Link } from "react-router-dom";

import { Card, FormControl } from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      Password: "",
      Email: "",
      Birthday: "",
      FavoriteMovies: [],
      UsernameError: "",
      PasswordError: "",
      EmailError: "",
      BirthdayError: ""
    };
  }
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }
  getUser(token) {
    axios.get('https://myflix-movie-api-2312.herokuapp.com/users/' + localStorage.getItem("user"), {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        this.setState({
          Username: response.data.Username,
          // Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies
        });
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  removeFavorite(movie) {
    const token = local.Storage.getItem("token");
    const url = "https://myflix-movie-api-2312.herokuapp.com/users/" + localStorage.getItem("user") + "/movies/" + movie._id;

    axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response);
        this.componentDidMount();
        alert(movie.Title + "has been removed from Favorites.");
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
  handleUpdate(e) {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    console.log(this.state);

    let setisValid = this.formValidation();
    if (setisValid) {
      axios.put('https://myflix-movie-api-2312.herokuapp.com/users/${user}', {
        Username: this.state.Username,
        Password: this.state.Password,
        Email: this.state.Email,
        Birthday: this.state.Birthday
      },
        {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
          const data = response.data;
          localStorage.setItem("user", data.Username);
          console.log(data);
          alert(user + "account has been updated.");
          console.log(res);
        })
        .catch(function (err) {
          console.log(err.res.data);
        });
    }
  }
  formValidation() {
    let UsernameError = {};
    let EmailError = {};
    let PasswordError = {};
    let BirthdayError = {};
    let isValid = true;
    if (this.state.Username.trim().length < 5) {
      UsernameError.usernameShort = "Username be alphanumeric characters only and contains at least 5 characters";
      isValid = false;
    }
    if (this.state.Password.trim().length < 3) {
      PasswordError.passwordMissing = "You must enter a password.(minimum 4 characters) ";
      isValid = false;
    }
    if (!(this.state.Email && this.state.Email.includes(".") && this.state.Email.includes("@"))) {
      EmailError.emailNotEmail = "A valid email address is required.";
      isValid = false;
    }
    if (this.state.birthday === '') {
      BirthdateError.birthdayEmpty = "Please enter your birthdate.";
      isValid = false;
    }
    this.setState({
      UsernameError: UsernameError,
      PasswordError: PasswordError,
      EmailError: EmailError,
      // ConfirmPasswordError: ConfirmPasswordError,
      BirthdayError: BirthdayError,
    })
    return isValid;
  };
  handleChange(e) {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  render() {
    const { movies } = this.props;
    const { UsernameError, EmailError, PasswordError, BirthdayError } = this.state;
    const FavoriteMoviesList = movies.filter((movie) => {
      return this.state.FavoriteMovies.includes(movie._id);
    });

    return (
      <div style={{ display: "flex" }}>
        <Container>
          <Row>
            <Col md={5}>
              <Form className="profile-details-form">
                <h1>User Profile:</h1>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control type="text" name="Username" value={this.state.Username} onChange={(e) => this.handleChange(e)} placeholder="Change Username" />
                  {Object.keys(UsernameError).map((key) => {
                    return (
                      <div key={key} style={{ color: red }}>
                        {UsernameError[key]}
                      </div>
                    );
                  })}
                </Form.Group>
                <Form.Group controlId="formPassword">
                  <Form.Label>Password: </Form.Label>
                  <FormControl type="password" name="Password" value={this.state.Password} onChange={(e) => this.handleChange(e)} placeholder="Change Your Password" />
                  {Object.keys(PasswordError).map((key) => {
                    return (
                      <div key={key} style={{ color: "red" }}>
                        {PasswordError[key]}
                      </div>
                    );
                  })}
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control type="text" name="Email" value={this.state.Email} onChange={(e) => this.handleChange(e)} placeholder="Update Email" />
                  {Object.keys(EmailError).map((key) => {
                    return (
                      <div key={key} style={{ color: "red" }}>
                        {PasswordError[key]}
                      </div>
                    );
                  })}
                </Form.Group>
                <Form.Group controlId="formBirthday">
                  <Form.Label>Brithday:</Form.Label>
                  <Form.Control type="date" name="Birthday" value={this.state.Birthday} onChange={(e) => this.handleChange(e)} placeholder="Update Birthday" />
                  {Object.keys(BirthdayError).map((key) => {
                    return (
                      <div key={key} style={{ color: "red" }}>
                        {BirthdayError[key]}
                      </div>
                    );
                  })}
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }


}


