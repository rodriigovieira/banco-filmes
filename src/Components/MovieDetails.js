import React, { Component } from 'react'

// import Movie from './Movie';

// {/* <Movie
//   data={this.props.data}
//   image={this.props.image}
//   genres={this.props.genre}
//   handleTitleClick={this.props.handleTitleClick}
// /> */}

export default class MovieDetails extends Component {
  state = {
    extraMovieDetails: '',
    loading: true,
    videoLink: ''
  }

  componentDidMount() {
    this.setState({ loading: true, videoLink: '' });
    
    const apiLink = `https://api.themoviedb.org/3/movie/${this.props.data.id}?api_key=3a9b881a75eeb15cfc1a9051e9889d7f&append_to_response=videos`;

    console.log(apiLink);

    fetch(apiLink)
      .then(response => response.json())
      .then(extraMovieDetails => {
        if (extraMovieDetails.videos.results.length !== 0) {
          this.setState({
            extraMovieDetails,
            loading: false,
            videoLink: `https://www.youtube.com/embed/${extraMovieDetails.videos.results[0].key}`
          })
        } else {
          this.setState({ extraMovieDetails, loading: false })
        }
      })
  }

  render() {
    return (
      <div className="movie-expanded">
        <p>Mostrando mais detalhes do filme "{this.props.data.title}".</p>

        {/* Rendering Box With Movie Info */}
        <div id="movie-box">
          <div id="box-header">

          </div>
          <div id="box-image">

          </div>
          <div id="box-overview">

          </div>
          <div id="box-info">

          </div>
          <div id="box-genres">

          </div>
          <div id="box-vote">

          </div>
        </div>

        {/* Displaying Video Fetched From API */}
        <div id="video">
        {!this.state.loading && 
            <iframe
              width="100%" height="700px" frameBorder="0" allowFullScreen
              title="Movie Trailer" allow="accelerometer; encrypted-media; gyroscope" 
              src={this.state.videoLink}
            >
            </iframe>
          }
        </div>
        <button onClick={this.props.handleReturnHomeScreen}>
          Retornar para a tela principal.
        </button>
      </div>
    )
  }
}
