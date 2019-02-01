import React from "react";

export default (props) => {
  const { title, date, overview } = props.data;
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
            <p>{title}</p>
          </div>
          <div id="release-date">
            <p>{date}</p>
          </div>
          <div id="overview">
            <p>{overview}</p>
          </div>
          <div id="genres">
            {props.genres &&
              props.genres.map(genre => {
                return <p key={Math.random()}>{genre}</p>;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
