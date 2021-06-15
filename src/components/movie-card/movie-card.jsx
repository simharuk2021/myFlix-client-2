import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

import heartImg from 'url:../../img/heart.svg';

import './movie-card.scss';

export class MovieCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleAdd() {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    axios.post(`https://myflix-movie-api-2312.herokuapp.com/users/${user}` + "/favorites/" +
      this.props.movie._id, {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        console.log(response);
        alert(this.props.movie.Title + " has been added to your Favorites List.");
      })
  }

  render() {
    const { movie } = this.props;

    return (
      <Card id="card" className="movie-card mb-2" text="white">
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title id="card-title">{movie.Title}</Card.Title>
          <Card.Text>{movie.Description.slice(0, 75)}...</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button id="openMovie" variant="outline-light">Open</Button>
          </Link>
          <button type="button" className="btn btn-white btn-rounded mr-md-3 z-depth-1a">
            <img id="heart-img"
              alt=""
              src={heartImg}
              width="20"
              height="20"
              fluid="true"
              onClick={() => this.handleAdd(movie)}
            /></button>

        </Card.Body>
      </Card>
    );
  }
}

