import React from 'react'

import Movie from './Movie';

export default (props) => {
  return (
    <div className="movie-expanded">
    <p>Mostrando mais detalhes do filme "{props.data.title}".</p>
      <Movie
        data={props.data}
        image={props.image}
        genres={props.genre}
        handleTitleClick={props.handleTitleClick}
      />
      <button
        onClick={props.handleReturnHomeScreen}
      >Retornar para a tela principal.</button>
    </div>
  )
}
