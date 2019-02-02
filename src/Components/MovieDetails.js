import React, { Component } from 'react'

// import Movie from './Movie';

{/* <Movie
  data={this.props.data}
  image={this.props.image}
  genres={this.props.genre}
  handleTitleClick={this.props.handleTitleClick}
/> */}

export default class MovieDetails extends Component {
  state = {
    extraMovieDetails: '',
    loading: true,
    videoLink: ''
  }

  componentDidMount() {
    this.setState({ loading: true, videoLink: '' });
    
    const apiLink = `http://api.themoviedb.org/3/movie/${this.props.data.id}?api_key=3a9b881a75eeb15cfc1a9051e9889d7f&append_to_response=videos`;

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
          this.setState({
            extraMovieDetails,
            loading: false,
          })
        }
      })
  }

  render() {
    return (
      <div className="movie-expanded">
        <p>Mostrando mais detalhes do filme "{this.props.data.title}".</p>
        <div id="video">
        {!this.state.loading && 
            <iframe
              width="560"
              height="315"
              src={this.state.videoLink}
              frameBorder="0"
              allow="accelerometer; encrypted-media; gyroscope" 
              allowFullScreen
              title="Movie Trailer"
            >
            </iframe>
          }
        </div>
        <button
          onClick={this.props.handleReturnHomeScreen}
        >
          Retornar para a tela principal.
        </button>
      </div>
    )
  }
}

// export default (props) => {
//   return (
//     <div className="movie-expanded">
//     <p>Mostrando mais detalhes do filme "{props.data.title}".</p>
//       <Movie
//         data={props.data}
//         image={props.image}
//         genres={props.genre}
//         handleTitleClick={props.handleTitleClick}
//       />
//       <button
//         onClick={props.handleReturnHomeScreen}
//       >Retornar para a tela principal.</button>
//     </div>
//   )
// }
