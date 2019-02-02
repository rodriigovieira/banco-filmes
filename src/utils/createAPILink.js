import { stringify } from "query-string";

const createAPILink = (url, query, searchType, querySearchType, searchText) => {
  const baseUrl = url || `https://api.themoviedb.org/3/${searchType}?`;
  const API_KEY = "3a9b881a75eeb15cfc1a9051e9889d7f";
  const language = "pt-BR";

  const stringified = stringify({
    ...query,
    api_key: API_KEY,
    [querySearchType]: searchText,
    language
  });

  return `${baseUrl}${stringified}`;
};

export { createAPILink };
