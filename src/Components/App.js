import React, { Component } from "react";

import Header from "./Header";
import SearchBar from "./SearchBar";
import Movie from "./Movie";
import "../styles/index.scss";

export default class App extends Component {
  state = {
    movieData: [],
    genreList: [],
    displayData: [],
    displayLoading: false,
    ready: false,
    instructions: true,
    resultsPerPage: 5,
    currentPage: 1,
  };

  handleSubmit = searchText => {
    this.setState({ displayLoading: true, ready: false, instructions: false });

    const { resultsPerPage, currentPage } = this.state;
    const indexOfLastResult = resultsPerPage * currentPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;

    const apiLink = `https://api.themoviedb.org/3/search/multi?api_key=3a9b881a75eeb15cfc1a9051e9889d7f&language=pt-BR&query=${searchText}&page=1&include_adult=true`;

    fetch(apiLink)
      .then(response => response.json())
      .then(movieData => {
        const displayData = movieData.results.slice(indexOfFirstResult,indexOfLastResult);

        this.setState({
          movieData: movieData.results,
          displayData,
          displayLoading: false,
          ready: true,
          instructions: false
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
  };

  renderResults = () => {
    return this.state.displayData.map((movie, index) => {
      let genreList = [];

      if (movie.genre_ids) {
        genreList = this.state.genreList
          .filter(genre => movie.genre_ids.includes(genre.id))
          .map(value => value.name);
      }

      return (
        <Movie
          key={index}
          title={movie.title}
          rating={movie.vote_average}
          date={movie.release_date}
          overview={movie.overview}
          image={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${movie.poster_path}`}
          genres={genreList}
        />
      );
    });
  };

  handlePageChange = (event) => {
    const indexOfLastResult = this.state.resultsPerPage * event.target.id;
    const indexOfFirstResult = indexOfLastResult - this.state.resultsPerPage;
    const displayData = this.state.movieData.slice(indexOfFirstResult, indexOfLastResult);

    this.setState({
      currentPage: event.target.id,
      displayData,
    })
  }

  renderPageList = () => {
    const { movieData, resultsPerPage } = this.state;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(movieData.length / resultsPerPage); i++) {
      pageNumbers.push(i);
    }

    return pageNumbers.map((number, index) => {
      let pageStyle = number === this.state.currentPage ? 'page-link-selected' : 'page-link';
      return (
        <button
          className={pageStyle}
          key={index}
          onClick={this.handlePageChange}
          id={number}
        >
          {number}
        </button>
      )
    })
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
        {this.state.instructions && (
          <p>Digite acima o nome do filme ou o gênero que você gostaria debuscar.</p>
        )}

        {/* Render Search Results */}
        {this.state.ready && this.renderResults()}

        {/* Show Pagination */}
        {this.state.ready && this.renderPageList()}

        <br />

        {/* Show clear screen button */}
        {this.state.ready && (
          <button onClick={this.emptyList}>Esvaziar Lista</button>
        )}
      </div>
    );
  }
}
