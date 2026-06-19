const axios = require('axios');
const cache = require('./cache');

// Cache results for one hour
const CACHE_DURATION = 1000 * 60 * 60;

class Movie {
  constructor(movie) {
    this.title = movie.title;
    this.overview = movie.overview;
    this.average_votes = movie.vote_average;
    this.total_votes = movie.vote_count;
    this.image_url = movie.poster_path 
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : '';
    this.popularity = movie.popularity;
    this.released_on = movie.release_date;
  }
}

async function handleMovies(request, response, next) {
  try {
    const city = request.query.searchQuery;
    const cacheKey = `movies-${city.toLowerCase()}`;

    // Check for fresh cached data before calling TMDB
    const cacheEntry = cache[cacheKey];

    // sends data if available; if not, calls TMDB for new results to send and save
    if (cacheEntry && Date.now() - cacheEntry.timestamp < CACHE_DURATION) {
      console.log('Movies cache hit');
      response.send(cacheEntry.data);
      return;
    }

    console.log('Movies cache miss');

    const movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;

    const movieResponse = await axios.get(movieURL);

    const movies = movieResponse.data.results.map(movie => new Movie(movie));

    cache[cacheKey] = {
      timestamp: Date.now(),
      data: movies
    };

    response.send(movies);
  } catch (error) {
    next(error);
  }
}

module.exports = handleMovies;