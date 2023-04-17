import axios from 'axios';

const IMDbApi = axios.create({
  baseURL: 'https://imdb-api.com/en/API',
  responseType: 'json',
  withCredentials: true,
});

const apiKey = 'k_icrdwe5w';

export {IMDbApi, apiKey} ;