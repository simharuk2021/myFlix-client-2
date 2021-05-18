import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'Fastastic Beasts and Where to Find Them', Director: 'David Yates', Genre: 'Fantasy', Description: 'The adventures of writer Newt Scamander in New York\'s secret community of witches and wizards seventy years before Harry Potter reads his book in school.', ImagePath: '../../img/fantasticbeasts' },
        { _id: 2, Title: 'The Hobbit: An Unexpected Journey', Director: 'Peter Jackson', Genre: 'Fantasy', Description: 'A reluctant Hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home, and the gold within it from the dragon Smaug.', ImagePath: '../../img/thehobbit.png' },
        { _id: 3, Title: 'Avengers: Endgame', Director: 'Anthony Russo', Genre: 'Action', Description: 'After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos\' actions and restore balance to the universe.', ImagePath: '../../img/avengersendgame.png' }
      ],
      selectedMovie: null
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
          ))
        }
      </div>
    );
  }
}