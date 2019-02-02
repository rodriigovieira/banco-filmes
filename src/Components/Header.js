import React from 'react'

export default (props) => {
  return (
    <header id="header">
      <p
        id="header-text"
        onClick={props.handleLogoClick}
        style={{ cursor: 'pointer' }}
      >
      Filmes</p>
    </header>
  )
}
