import React, { Component } from "react";

import Header from "./Header";
import SearchBar from "./SearchBar";
import Movie from "./Movie";
import "../styles/index.scss";

export default class App extends Component {
  state = {
    movieData: [],
    genreList: [],
    displayLoading: false,
    ready: false,
    instructions: true
  };

  handleSubmit = searchText => {
    this.setState({ displayLoading: true, ready: false, instructions: false });

    const apiLink = `https://api.themoviedb.org/3/search/multi?api_key=3a9b881a75eeb15cfc1a9051e9889d7f&language=pt-BR&query=${searchText}&page=1&include_adult=true`;

    fetch(apiLink)
      .then(response => response.json())
      .then(movieData => {
        this.setState({
          movieData,
          displayLoading: false,
          ready: true,
          instructions: false,
        });
      });
  };

  componentDidMount() {
    // Fetching list of genres from TMDB with ID and name
    fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=3a9b881a75eeb15cfc1a9051e9889d7f&language=pt-BR")
      .then(response => response.json())
      .then(genreList => this.setState({ genreList: genreList.genres }));
  }

  emptyList = () => {
    this.setState({ ready: false, instructions: true });
  }

  render() {
    return (
      <div>
        <Header />
        <SearchBar handleSubmit={this.handleSubmit} />

        {/* Show loading message */}
        {this.state.displayLoading && (
          <p stype={{ margin: 5, fontSize: 32 }}>Carregando...</p>
        )}

        {/* Show instructions message */}
        {this.state.instructions &&
          <p>Digite acima o nome do filme ou o gênero que você gostaria de buscar.</p>
        }

        {/* Render Search Results */}
        {this.state.ready &&
          this.state.movieData.results.map(movie => {
              let genreList = [];
              if (movie.genre_ids) {
              genreList = this.state.genreList
                .filter(genre => movie.genre_ids.includes(genre.id))
                .map(value => value.name);
              }

            return (
              <Movie
                key={Math.random()}
                title={movie.title}
                rating={movie.vote_average}
                date={movie.release_date}
                overview={movie.overview}
                image={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${movie.poster_path}`}
                genres={genreList}
              />
            );
          })}
          {this.state.ready && <button onClick={this.emptyList} >Esvaziar Lista</button>}
      </div>
    );
  }
}
