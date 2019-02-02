import React, { Component } from "react";

import Header from "./Header";
import SearchBar from "./SearchBar";
import Movie from "./Movie";
import MovieDetails from './MovieDetails';

import { fetchGenres, getMovies } from '../utils/';

import "../styles/index.scss";

export default class App extends Component {
  state = {
    movieData: [],
    genres: [],
    displayData: [],
    displayLoading: false,
    ready: false,
    instructions: true,
    resultsPerPage: 5,
    currentPage: 1,
    fullMovieDisplay: false,
    fullMovieProps: ''
  };

  componentDidMount() {
    // Fetching list of genres from TMDB with ID and name
    fetchGenres().then(({ genres }) => this.setState({ genres }));

    // Accessing LocalStorage and defining number of results per page
    if (localStorage.getItem('resultsPerPage')) {
      this.setState({ resultsPerPage: localStorage.getItem('resultsPerPage') })
    }
  }

  handleLogoClick = () => this.setState({ fullMovieDisplay: false, instructions: true });

  handleSubmit = searchText => {
    this.setState({
      displayLoading: true,
      ready: false,
      instructions: false,
      fullMovieDisplay: false
    });

    const { resultsPerPage, currentPage } = this.state;
    const indexOfLastResult = resultsPerPage * currentPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;

    getMovies(searchText)
      .then(movieData => this.setState({
          movieData: movieData.results,
          displayData: movieData.results.slice(indexOfFirstResult, indexOfLastResult),
          displayLoading: false,
          ready: true,
          instructions: false
        }));
  };

  handleEmptyList = () => this.setState({ ready: false, instructions: true });

  handleResultsPerPage = (event) => {
    const indexOfLastResult = event.target.value * this.state.currentPage;
    const indexOfFirstResult = indexOfLastResult - event.target.value;

    this.setState({
      resultsPerPage: event.target.value,
      displayData: this.state.movieData.slice(indexOfFirstResult, indexOfLastResult)
    });

    // Saving user's choice to LocalStorage
    localStorage.setItem('resultsPerPage', event.target.value);
  }

  handlePageChange = (event) => {
    const indexOfLastResult = this.state.resultsPerPage * event.target.id;
    const indexOfFirstResult = indexOfLastResult - this.state.resultsPerPage;
    const displayData = this.state.movieData.slice(indexOfFirstResult, indexOfLastResult);

    this.setState({
      currentPage: event.target.id,
      displayData,
    })
  }

  handleTitleClick = (fullMovieProps) => {
    this.setState({
      ready: false,
      fullMovieProps,
      fullMovieDisplay: true,
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

  renderResults = () => {
    return this.state.displayData.map((movie, index) => {
      let genres = [];

      if (movie.genre_ids) {
        genres = this.state.genres
          .filter(genre => movie.genre_ids.includes(genre.id))
          .map(value => value.name);
      }

      return (
        <Movie
          key={index}
          data={movie}
          image={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${movie.poster_path}`}
          handleTitleClick={this.handleTitleClick}
          genres={genres}
        />
      );
    });
  };

  handleReturnHomeScreen = () => this.setState({ fullMovieDisplay: false, ready: true})

  render() {
    return (
      <div>
        <Header handleLogoClick={this.handleLogoClick} />
        <SearchBar handleSubmit={this.handleSubmit} />

        {/* Show loading message */}
        {this.state.displayLoading && (
          <p stype={{ margin: 5, fontSize: 32 }}>Carregando...</p>
        )}

        {/* Show instructions message */}
        {this.state.instructions && (
          <p>Digite acima o nome do filme ou o ano que você gostaria de buscar.</p>
        )}

        {/* Messages containing number of results and options */}
        {this.state.ready &&
        <p>
          Mostrando {this.state.displayData.length} de {this.state.movieData.length} resultados.
          Mostrar <select
            value={this.state.resultsPerPage}
            onChange={this.handleResultsPerPage}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select> resultados por página.
        </p>
        }

        {/* Render Search Results */}
        {this.state.ready && this.renderResults()}

        {/* Show Pagination */}
        {this.state.ready && this.renderPageList()}

        <br />

        {/* Show clear screen button */}
        {this.state.ready && (
          <button className="emtpy" onClick={this.handleEmptyList}>
            <span id="empty-text">Esvaziar Lista</span>
          </button>
        )}

        {/* Render Movie Details */}
        {this.state.fullMovieDisplay &&
        <MovieDetails
            data={this.state.fullMovieProps.data}
            image={this.state.fullMovieProps.image}
            genres={this.state.fullMovieProps.genres}
            handleTitleClick={this.state.fullMovieProps.handleTitleClick}
            handleReturnHomeScreen={this.handleReturnHomeScreen}
        />}
      </div>
    );
  }
}
