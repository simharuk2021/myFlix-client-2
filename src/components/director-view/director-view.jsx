import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";

import './director-view.scss';

export function DirectorView(props) {


  const { director, onBackClick } = props;

  return (
    <Card id="lg-card" className="director-view">
      <Card.Header id="movie-title">{director.Name}</Card.Header>
      <Card.Body>
        <Card.Text>
          Bio: {director.Bio} <br />
          Born: {director.Birth}  <br />
        </Card.Text>
        <Button variant="outline-success" onClick={onBackClick}>Back</Button>
      </Card.Body>
    </Card>
  );
}


DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};

