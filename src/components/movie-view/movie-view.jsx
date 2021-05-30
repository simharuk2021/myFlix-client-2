import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import './movie-view.scss';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Card className="movie-view" bg="dark" text="white">
        <Card.Header as="h2">{movie.Title}</Card.Header>
        <Card.Img className="movie-poster" variant="top" src="https://via.placeholder.com/693px200" />
        <Card.Body>
          <Card.Text>
            Description: {movie.Description} <br />
            Genre: {movie.Genre.Name} <br />
            Director: {movie.Director.Name} <br />
          </Card.Text>
          <Button variant="outline-light" onClick={onBackClick}>Back</Button>
        </Card.Body>
      </Card>
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

