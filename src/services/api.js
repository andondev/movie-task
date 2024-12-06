import axios from 'axios';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

if (!API_KEY) {
  console.error('OMDB API key is missing.');
}

const api = axios.create({
  baseURL: BASE_URL,
});

export const searchMovies = async (query, page = 1) => {
  if (!API_KEY) {
    throw new Error('API key is not configured. Please check your environment settings.');
  }

  try {
    const response = await api.get('', {
      params: {
        apikey: API_KEY,
        s: query,
        type: 'movie',
        page: page,
      },
    });

    if (response.data.Response === 'False') {
      throw new Error(response.data.Error);
    }

    return response.data;
  } catch (error) {
    console.error('Search Error:', error);
    if (error.response?.status === 401) {
      throw new Error('Invalid API key. Please check your configuration.');
    }
    throw error;
  }
};

export const getMovieById = async (id) => {
  if (!API_KEY) {
    throw new Error('API key is not configured. Please check your environment settings.');
  }

  try {
    const response = await api.get('', {
      params: {
        apikey: API_KEY,
        i: id,
        plot: 'full',
      },
    });

    if (response.data.Response === 'False') {
      throw new Error(response.data.Error);
    }

    return response.data;
  } catch (error) {
    console.error('Movie Details Error:', error);
    if (error.response?.status === 401) {
      throw new Error('Invalid API key. Please check your configuration.');
    }
    throw error;
  }
};