import React from "react";

export default (props) => {
  const { title, date, overview, vote_average } = props.data;
  return (
    <div id="root">
      <div className="container">
        <div id="image">
          <img src={props.image} alt="Movie' Poster" />
        </div>
        <div id="content">
          <div
            id="movie-title"
            onClick={() => {
              props.handleTitleClick(props)
            }}
          >
            <span id="text-title-movie">{title}</span>
          </div>
          <div id="votes-circle">
            <span id="votes-circle-text">
              {`${vote_average * 10}%`}
            </span>
          </div>
          <div id="release-date">
            <p>{date}</p>
          </div>
          <div id="overview">
            <span id="text-overview-brief">{overview || <p>Sinopse indisponível.</p>}</span>
          </div>
          <div id="container-genres">
            {props.genres &&
              props.genres.map((genre, index) => {
                return <span id="circle-genre" key={index}>{genre}</span>;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
