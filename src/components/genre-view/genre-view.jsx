import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import './genre-view.scss';

export function GenreView(props) {


  const { genre, onBackClick } = props;

  return (
    <Card id="lg-card" className="genre-view">
      <Card.Header id="movie-title">{genre.Name}</Card.Header>
      <Card.Body>
        <Card.Text>
          {genre.Description} <br />
        </Card.Text>
        <Button variant="outline-light" onClick={onBackClick}>Back</Button>
      </Card.Body>
    </Card>
  );
}


GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};

