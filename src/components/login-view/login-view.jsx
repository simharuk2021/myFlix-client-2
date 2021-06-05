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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
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

  return (

    <div id="login-page">
      {/* <h3 className="logo">myFlix</h3> */}

      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form id="login-form">
            <Form.Group controlId="formUsername">
              <Form.Label>Username: </Form.Label>
              <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password: </Form.Label>
              <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
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