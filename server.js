// import statements equivalent
const express = require('express');  // builds backend
const cors = require('cors');  // lets front and back communicate regfardless of port 
const axios = require('axios');
require('dotenv').config();  // loads env variables from .env 

//  creates server
const app = express();
app.use(cors());  // turns on CORS

const PORT = process.env.PORT || 3001;

class Forecast {
  constructor(day) {
    this.date = day.datetime;
    this.description = `Low of ${day.low_temp}, high of ${day.max_temp} with ${day.weather.description};`
  }
}

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

// `weather` route with lat and lon from frontend
app.get('/weather', async (request, response, next) => {
  try {
    const { lat, lon } = request.query;

    const weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=5`;

    const weatherResponse = await axios.get(weatherURL);

    const formattedWeather = weatherResponse.data.data.map(day => new Forecast(day));
    
    response.send(formattedWeather);
  } catch (error) {
    next(error);
  }  
});

app.get('/movies', async (request, response, next) => {
  try {
    const city = request.query.searchQuery;

    const movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`;

    const movieResponse = await axios.get(movieURL);

    const movies = movieResponse.data.results.map(movie => new Movie(movie));

    response.send(movies);
  } catch (error) {
    next(error);
  }
});

// generic error handle
app.use((error, request, response, next) => {
  response.status(500).send({
    error: `Something went wrong on our server.`
  });
});

// starts server and 
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
