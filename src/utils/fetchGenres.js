const fetchGenres = () => {
  const fetchGenresAPILink =
    "https://api.themoviedb.org/3/genre/movie/list?api_key=3a9b881a75eeb15cfc1a9051e9889d7f&language=pt-BR";

  return fetch(fetchGenresAPILink)
    .then(response => response.json())
    .then(genres => genres);
};

export { fetchGenres };
