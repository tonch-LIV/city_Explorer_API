const express = require('express');  // builds backend
const cors = require('cors');  // lets front and back communicate regfardless of port 

const handleWeather = require('./weather');
const handleMovies = require('./movies');

require('dotenv').config();  // loads env variables from .env 

//  creates Express server
const app = express();
app.use(cors());  // turns on CORS

const PORT = process.env.PORT || 3001;

// routes handlers
app.get('/weather', handleWeather);
app.get('/movies', handleMovies);

// generic error handler
app.use((error, request, response, next) => {
  response.status(500).send({
    error: `Something went wrong on our server.`
  });
});

// starts server 
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
