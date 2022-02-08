import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Link } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './registration-view.scss';


export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const [usernameError, setUsernameError] = useState({});
  const [passwordError, setPasswordError] = useState({});
  const [emailError, setEmailError] = useState({});
  const [birthdayError, setBirthdayError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let setisValid = formValidation();
    // console.log(username, password, email, birthday);
    if (setisValid) {
      axios.post('https://my-movies-souperapp.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
        })
        .catch(e => {
          console.log('error registering the user')
        });
      // props.onRegister(username);
    };
  }

  const formValidation = () => {
    let usernameError = {};
    let passwordError = {};
    let emailError = {};
    let birthdayError = {};
    let isValid = true;

    if (username.trim().length < 5) {
      usernameError.usernameShort = "Username be alphanumeric characters only and contains at least 5 characters";
      isValid = false;
    }
    if (password.trim().length < 3) {
      passwordError.passwordMissing = "You must enter a password.(minimum 4 characters) ";
      isValid = false;
    }
    if (!(email && email.includes(".") && email.includes("@"))) {
      emailError.emailNotEmail = "A valid email address is required.";
      isValid = false;
    }
    if (birthday === '') {
      birthdayError.birthdayEmpty = "Please enter your birthday.";
      isValid = false;
    }
    setUsernameError(usernameError);
    setPasswordError(passwordError);
    setEmailError(emailError);
    setBirthdayError(birthdayError);
    return isValid;
  };

  return (
    <div id="reg-page">
      {/* <h3 className="logo">myFlix</h3> */}
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form id="reg-form">
            <Form.Group controlId="formUsername">
              <Form.Label>Username: </Form.Label>
              <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
              {Object.keys(usernameError).map((key) => {
                return (
                  <div key={key} style={{ color: red }}>
                    {usernameError[key]}
                  </div>
                );
              })}
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password: </Form.Label>
              <Form.Control type="text" onChange={e => setPassword(e.target.value)} />
              {Object.keys(passwordError).map((key) => {
                return (
                  <div key={key} style={{ color: "red" }}>
                    {passwordError[key]}
                  </div>
                );
              })}
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email: </Form.Label>
              <Form.Control type="text" onChange={e => setEmail(e.target.value)} />
              {Object.keys(emailError).map((key) => {
                return (
                  <div key={key} style={{ color: "red" }}>
                    {emailError[key]}
                  </div>
                );
              })}
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday: </Form.Label>
              <Form.Control type="date" onChange={e => setBirthday(e.target.value)} />
              {Object.keys(birthdayError).map((key) => {
                return (
                  <div key={key} style={{ color: "red" }}>
                    {birthdayError[key]}
                  </div>
                );
              })}
            </Form.Group>
            <Button variant="outline-success" type="button" onClick={handleSubmit}>Submit</Button> {''} {''}
            <Link to={`/`}>
              <Button variant="outline-success">Back to Login</Button>
            </Link>
          </Form>
        </Col>
      </Row>

    </div>
  )
}

RegistrationView.propTypes = {
  onRegister: PropTypes.func.isRequired
};