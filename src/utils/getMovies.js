import { createAPILink } from './createAPILink';

const getMovies = (searchText) => {
  const query = {
    sort_by: 'popularity.desc',
    include_adult: true,
    include_video: true,
  };

  const querySearchType = isNaN(searchText) ? 'query' : 'year';

  const searchType = isNaN(searchText) ? 'search/movie' : 'discover/movie';

  const apiLink = createAPILink(null, query, searchType, querySearchType, searchText);

  return fetch(apiLink).then(response => response.json())
}

export { getMovies };
