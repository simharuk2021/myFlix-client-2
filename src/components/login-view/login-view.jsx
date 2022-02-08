import React, { useState } from 'react';
import axios from 'axios';

import { Link } from "react-router-dom";

import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './login-view.scss';

//initiliases the properties
export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  //removes default behaviour of the page reloading so the app waits for the submit button to be clicked 
  const handleSubmit = (e) => {
    e.preventDefault();
    let setisValid = formValidation();
    
  //makes a call to the API login endpoint sending the username and password.  returns an error if no such user is found
    if (setisValid) {
      axios.post('https://my-movies-souperapp.herokuapp.com/login', {
        Username: username,
        Password: password
      })
        .then(res => {
          const data = res.data;
          props.onLoggedIn(data);
        })
        .catch(e => {
          console.log('no such user')
        });
    };
  }

  // logic which validates the login form data
  const formValidation = () => {
    let usernameError = {};
    let passwordError = {};
    let isValid = true;

    if (username.trim().length < 5) {
      usernameError.usernameShort = "Username be alphanumeric characters only and contains at least 5 characters";
      isValid = false;
    }
    if (password.trim().length < 3) {
      passwordError.passwordMissing = "You must enter a password.(minimum 4 characters) ";
      isValid = false;
    }
    setUsernameError(usernameError);
    setPasswordError(passwordError);
    return isValid;
  };

  // returns the login form and logic for submitting the call to the login API
  return (

    <div id="login-page">


      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form id="login-form">
            <Form.Group controlId="formUsername">
              <Form.Label>Username: </Form.Label>
              <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
              {Object.keys(usernameError).map((key) => {
                return (
                  <div key={key} style={{ color: "red" }}>
                    {usernameError[key]}
                  </div>
                );
              })}
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password: </Form.Label>
              <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
              {Object.keys(passwordError).map((key) => {
                return (
                  <div key={key} style={{ color: "red" }}>
                    {passwordError[key]}
                  </div>
                );
              })}
            </Form.Group>
            <Button id="login-btn" variant="outline-success mr-4" type="submit" onClick={handleSubmit}>Submit</Button>{''} Not yet a member?
            <Link to={`/register`}>
              <Button id="link" variant="link">Register Now</Button>
            </Link>
          </Form>
        </Col>
      </Row>



    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  handleSubmit: (username, password) =>
    dispatch(handleSubmit(username, password))
});

export default connect(null, mapDispatchToProps)(LoginView);