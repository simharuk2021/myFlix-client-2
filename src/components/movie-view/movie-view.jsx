import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import { Link } from "react-router-dom";

import './movie-view.scss';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Card id="lg-card" className="movie-view">
        <Card.Header id="movie-title">{movie.Title}</Card.Header>
        <Card.Img className="movie-poster" variant="top" src={movie.PosterPath} />
        <Card.Body>
          <Card.Text>
            Description: {movie.Description}
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
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string
    }).isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};

