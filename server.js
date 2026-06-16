// import statements equivalent
const express = require('express');  // builds backend
const cors = require('cors');  // lets front and back communicate regfardless of port 
const axios = require('axios');
const handleWeather = require('./weather');
require('dotenv').config();  // loads env variables from .env 

//  creates server
const app = express();
app.use(cors());  // turns on CORS

const PORT = process.env.PORT || 3001;

app.get('/weather', handleWeather);


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
