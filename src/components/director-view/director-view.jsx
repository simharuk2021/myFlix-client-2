import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";

import './director-view.scss';

export class DirectorView extends React.Component {

  render() {
    const { director, onBackClick } = this.props;

    return (
      <Card id="lg-card" className="director-view">
        <Card.Header id="movie-title">{director.Name}</Card.Header>
        <Card.Body>
          <Card.Text>
            Bio: {director.Bio} <br />
            DOB-DOD: {director.Birth}  - {director.Death}<br />
          </Card.Text>
          <Button variant="outline-light" onClick={onBackClick}>Back</Button>
        </Card.Body>
      </Card>
    );
  }
}

DirectorView.propTypes = {
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

