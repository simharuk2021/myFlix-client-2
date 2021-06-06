import React, { useState } from 'react';
import axios from 'axios';

import { Link } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './login-view.scss';
import { NavbarBrand } from 'react-bootstrap';

export function LoginView(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let setisValid = formValidation();
    // console.log(username, password);
    /* Send a request to the server for authentication */

    if (setisValid) {
      axios.post('https://myflix-movie-api-2312.herokuapp.com/login', {
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

  return (

    <div id="login-page">
      {/* <h3 className="logo">myFlix</h3> */}

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
            <Button variant="outline-warning" type="submit" onClick={handleSubmit}>Submit</Button>{''} {''}
            <Link to={`/register`}>
              <Button variant="outline-light">Register</Button>
            </Link>
          </Form>
        </Col>
      </Row>



    </div>
  );
}