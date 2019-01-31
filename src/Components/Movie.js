import React from "react";

export default ({ image, title, date, overview, genres }) => {
  return (
    <div id="root">
      <div className="container">
        <div id="image">
          <img src={image} alt="Movie' Poster" />
        </div>
        <div id="content">
          <div id="movie-title">
            <p>{title}</p>
          </div>
          <div id="release-date">
            <p>{date}</p>
          </div>
          <div id="overview">
            <p>{overview}</p>
          </div>
          <div id="genres">
            {genres &&
              genres.map(genre => {
                return <p key={Math.random()}>{genre}</p>;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
