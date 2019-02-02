import React, { Component } from 'react'

export default class MovieDetails extends Component {
  state = {
    extraMovieDetails: '',
    loading: true,
    videoLink: '',
    video: false,
  }

  componentDidMount() {
    this.setState({ loading: true, videoLink: '', video: false });
    
    const apiLink = `https://api.themoviedb.org/3/movie/${this.props.data.id}?api_key=3a9b881a75eeb15cfc1a9051e9889d7f&append_to_response=videos`;

    fetch(apiLink)
      .then(response => response.json())
      .then(extraMovieDetails => {
        if (extraMovieDetails.videos.results.length !== 0) {
          this.setState({
            extraMovieDetails,
            loading: false,
            videoLink: `https://www.youtube.com/embed/${extraMovieDetails.videos.results[0].key}`,
            video: true,
          })
        } else {
          this.setState({ extraMovieDetails, loading: false, video: false })
        }
      })
  }

  render() {
    const { title, release_date, overview, poster_path } = this.props.data;
    const image = `https://image.tmdb.org/t/p/w600_and_h900_bestv2/${poster_path}`;

    const { original_language, runtime, vote_average } = this.state.extraMovieDetails

    return (
      <div>
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
              <img id="box-image-image" src={image} heigth="540" width="360" alt="Movie Poster" />
            </div>
            <span id="text-overview-title">Sinopse</span>

            <hr/>

            <span id="text-overview">{overview || 'Informação não disponível.'}</span>
          </div>
          <div id="box-informations">
            <span id="text-informations-title">Informações</span>

            <hr/>

            <div id="informations-container">
              <span id="text-situation">Situação</span>
              <span id="text-language">Idioma</span>
              <span id="text-duration">Duração</span>
              <span id="text-budget">Orçamento</span>
              <span id="text-income">Receita</span>
            </div>
            {!this.state.loading && 
            <div id="details-container">
              <span id="detail-situation">{
                (this.state.extraMovieDetails.status.toLowerCase() === 'released') ?
                'Lançado' : 'Produção'
              }</span>
              <span id="detail-language">{original_language === 'en' ? 'Inglês' : 'Português'}</span>
              <span id="detail-duration">{runtime} min</span>
              <span id="detail-budget">{
                this.state.extraMovieDetails.budget ?
                `$${this.state.extraMovieDetails.budget.toFixed(2)}` :
                'Indisponível'
              }</span>
              <span id="detail-income">{
                this.state.extraMovieDetails.revenue ?
                `$${this.state.extraMovieDetails.revenue.toFixed(2)}` :
                'Indisponível'
                }</span>
            </div>
            }
          </div>
          <div id="box-genres">
            {this.props.genres.map((genre, index) =>
            <span id="box-genre" key={index}>{genre}</span>)
            }
          </div>
          <div id="box-vote">
              <span id="circle-vote">{`${vote_average * 10}%`}</span>
          </div>
        </div>

        {/* Displaying Video Fetched From API */}
        <div id="video">
        {this.state.video && 
            <iframe
              width="100%" height="700px" frameBorder="0" allowFullScreen
              title="Movie Trailer" allow="accelerometer; encrypted-media; gyroscope" 
              src={this.state.videoLink}
            >
            </iframe>
          }
        </div>
        <button id="go-home" onClick={this.props.handleReturnHomeScreen}>
          Voltar
        </button>
      </div>
    )
  }
}
