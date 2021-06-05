import React from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
// import moment from 'moment';

import { Link } from "react-router-dom";

import { Card, FormControl } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import './profile-view.scss';

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
    console.log(localStorage.getItem("user"));
    axios.get("https://myflix-movie-api-2312.herokuapp.com/users/" +
      localStorage.getItem("user"), {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(response => {
        this.setState({
          Username: response.data.Username,
          // Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  removeFavorite(movie) {
    const token = localStorage.getItem("token");
    axios
      .delete("https://myflix-movie-api-2312.herokuapp.com/users/" +
        localStorage.getItem("user") + "/movies/" + movie._id,
        {
          headers: { Authorization: `Bearer ${token}` },
        })
      .then((response) => {
        console.log(response);
        this.componentDidMount();
        // location.reload();
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
      BirthdayError.birthdayEmpty = "Please enter your birthday.";
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
    const FavoriteMovieList = movies.filter(movie => {
      return this.state.FavoriteMovies.includes(movie._id);
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
                  <Form.Control type="text" name="Username" value={this.state.Username} onChange={(e) => this.handleChange(e)} placeholder="Change Username" />
                  {Object.keys(UsernameError).map((key) => {
                    return (
                      <div key={key} style={{ color: red }}>
                        {UsernameError[key]}
                      </div>
                    );
                  })}
                  <Form.Text id="usernameHelpBlock" muted>
                    Username must be a minimum of 5 characters
                  </Form.Text>
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
                  <Form.Text id="passwordHelpBlock" muted>
                    Password must be a minimum of 4 characters
                  </Form.Text>
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control type="text" name="Email" value={this.state.Email} onChange={(e) => this.handleChange(e)} placeholder="john.doe@email.com" />
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
                <Link to={'`/users/${this.state.Username}`'}>
                  <Button variant="outline-warning" type="link" block onClick={(e) => this.handleUpdate(e)}>Save Changes</Button>
                </Link>
              </Form>

            </div>
          </Col>

          <div id="favoriteMovies">
            <Col md={4}>
              <Card.Title as="h4">Your Favorite Movies:</Card.Title>
              {FavoriteMovieList.map((movie) => {
                return (
                  <Col md={3} key={movie._id}>
                    <Card className='mb-20'>
                      <Card.Img variant="top" src={movie.ImagePath} />
                      <Card.Body>
                        <Link to={`/movies/${movie._id}`}>
                          <Card.Text as='h6'>{movie.Title}</Card.Text>
                        </Link>
                      </Card.Body>
                    </Card>
                    <Button variant="outline-warning" onClick={() => this.removeFavorite(movie)}>
                      Remove
                      </Button>
                  </Col>
                );

              })}
            </Col>
          </div>

        </Row>
        <div id="delete-account">
          <br />
          <Button variant="outline-warning" onClick={() => this.handleDelete()}>Delete Account</Button>
        </div>
      </div >
    );
  }
}

ProfileView.propType = {
  movies: PropTypes.array.isRequired
};


