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

    const searchByMovieTitle = `https://api.themoviedb.org/3/search/movie?api_key=3a9b881a75eeb15cfc1a9051e9889d7f&language=pt-BR&query=${searchText}&page=1&include_adult=true`;

    const searchByYear = `https://api.themoviedb.org/3/discover/movie?api_key=3a9b881a75eeb15cfc1a9051e9889d7f&language=pt-BR&sort_by=popularity.desc&include_adult=true&include_video=true&page=1&year=${searchText}`
    
    const apiLink = isNaN(searchText) ? searchByMovieTitle : searchByYear;

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

  handleEmptyList = () => {
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
          data={movie}
          image={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${movie.poster_path}`}
          genres={genreList}
        />
      );
    });
  };

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

  componentDidMount() {
    // Fetching list of genres from TMDB with ID and name
    fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=3a9b881a75eeb15cfc1a9051e9889d7f&language=pt-BR")
      .then(response => response.json())
      .then(genreList => this.setState({ genreList: genreList.genres }));

    // Accessing LocalStorage and defining number of results per page
    if (localStorage.getItem('resultsPerPage')) {
      this.setState({ resultsPerPage: localStorage.getItem('resultsPerPage') })
    }
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
          <button className="emtpy" onClick={this.handleEmptyList}>Esvaziar Lista</button>
        )}
      </div>
    );
  }
}
