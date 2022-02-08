import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import { Link } from "react-router-dom";

import './movie-view.scss';

//creates a function based component and sets properties
export function MovieView(props) {
  const { movie, onBackClick } = props;

//creates card with populated movie data including links to Genre and Director details  
  return (
    <Card id="lg-card" className="movie-view">
      <Card.Header id="movie-title">{movie.Title}</Card.Header>
      <Card.Img className="movie-poster" variant="top" src={movie.PosterPath} />
      <Card.Body>
        <Card.Text>
          {movie.Description}
          <br />
          Genre: <Link to={`/genres/${movie.Genre.Name}`} id="link">{movie.Genre.Name}</Link>
          <br />
          Director:  <Link to={`/directors/${movie.Director.Name}`} id="link">{movie.Director.Name}</Link>
          <br />
        </Card.Text>
        <Button id="backButton" variant="outline-light" onClick={onBackClick}>Back</Button>
      </Card.Body >
    </Card >
  );
}

