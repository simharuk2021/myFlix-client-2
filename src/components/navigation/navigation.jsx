import React, { useState } from 'react';
import axios from 'axios';

import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";

// import './navigation.scss';

export class Navigation extends React.Component {

  render() {
    let user = localStorage.getItem("user");
    const { onLoggedOut } = this.props;

    return (
      <Col md={12}>
        <Navbar className="d-flex flex-md-grow-11" bg="light" sticky="top">
          <Navbar.Brand href="#home">
            <Link to={'/'}>
              <img
                src="/logo.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
              /></Link>{''}   myFlix
            </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Link to={`/users/${user}`}>
                <Button variant="link" >Profile: {this.state.user}{''}</Button>
              </Link>
            </Navbar.Text>
          </Navbar.Collapse>
          <Button variant="outline-warning" onClick={onLoggedOut}>Sign Out</Button>
        </Navbar>
      </Col>

    );
  }
}



