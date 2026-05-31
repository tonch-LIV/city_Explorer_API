// import statements equivalent
const express = require('express');  // builds backend
const cors = require('cors');  // lets front and back communicate regfardless of port 
require('dotenv').config();  // loads env variables from .env 

const weatherData = require('./data/weather.json');

// console.log(weatherData);

//  creates server
const app = express();
app.use(cors());  // turns on CORS

const PORT = process.env.PORT || 3001;

// `weather` route with searchQuery
app.get('/weather', (request, response) => {
  const { lat, lon, searchQuery } = request.query;

  const city = weatherData.find(city => {
    return city.city_name.toLowerCase() === searchQuery.toLowerCase();
  });

  response.send(city);
});

// starts server and 
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`)
});