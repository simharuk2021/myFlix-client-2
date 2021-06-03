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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    axios.post('https://myflix-movie-api-2312.herokuapp.com/users', {
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
    props.onRegister(username);
  };

  return (
    <div id="reg-page">
      <h3 className="logo">myFlix</h3>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form id="reg-form">
            <Form.Group controlId="formUsername">
              <Form.Label>Username: </Form.Label>
              <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password: </Form.Label>
              <Form.Control type="text" onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email: </Form.Label>
              <Form.Control type="text" onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday: </Form.Label>
              <Form.Control type="text" onChange={e => setBirthday(e.target.value)} />
            </Form.Group>
            <Button variant="outline-warning" type="button" onClick={handleSubmit}>Submit</Button> {''} {''}
            <Link to={`/`}>
              <Button variant="outline-light">Back to Login</Button>
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