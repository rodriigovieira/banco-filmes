import React, { Component } from 'react'

export default class MovieDetails extends Component {
  state = {
    extraMovieDetails: '',
    loading: true,
    videoLink: ''
  }

  componentDidMount() {
    this.setState({ loading: true, videoLink: '' });
    
    const apiLink = `https://api.themoviedb.org/3/movie/${this.props.data.id}?api_key=3a9b881a75eeb15cfc1a9051e9889d7f&append_to_response=videos`;

    //https://image.tmdb.org/t/p/w600_and_h900_bestv2/t0idiLMalKMj2pLsvqHrOM4LPdQ.jpg

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
    const { title, release_date, overview, poster_path } = this.props.data;
    const image = `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${poster_path}`;
    console.log(this.state.extraMovieDetails);

    return (
      <div>
      {console.log(this.props)}
        <p id="details">Mostrando mais detalhes do filme "{this.props.data.title}".</p>

        {/* Rendering Box With Movie Info */}
        <div id="movie-box">
          <div id="box-header">
            <span id="text-title">{title}</span>
            <span id="text-date">{release_date}</span>
          </div>

          <br />

          <div id="box-overview">
            <div id="box-image">
              <img id="box-image-image" src={image} heigth="450" width="300" alt="Movie Poster" />
            </div>
            <span id="text-overview-title">Sinopse</span>

            <hr/>

            <span id="text-overview">{overview}</span>
          </div>
          {/* <div id="box-genres">

          </div>
          <div id="box-vote">

          </div> */}
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
        <button id="go-home" onClick={this.props.handleReturnHomeScreen}>
          Retornar para a tela principal
        </button>
      </div>
    )
  }
}
