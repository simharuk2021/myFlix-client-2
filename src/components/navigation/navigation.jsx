import React from 'react';
import axios from 'axios';

import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";

// import './navigation.scss';

export class Navigation extends React.Component {

  render() {
    const { user, onLoggedOut } = this.props;

    return (
      <Col md={12}>
        <Navbar className="d-flex flex-md-grow-11" bg="light" sticky="top">
          <Navbar.Brand href="#home">
            <img
              src="/logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{''}myFlix
            </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">{user.Username}</a>
            </Navbar.Text>
          </Navbar.Collapse>
          <Button variant="outline-warning" onClick={onLoggedOut}>Sign Out</Button>
        </Navbar>
      </Col>

    );
  }
}



