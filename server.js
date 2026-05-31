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

class Forecast {
  constructor(dayObj) {
    this.date = dayObj.valid_date;
    this.description = 
    `Low of ${dayObj.low_temp},
    high of ${dayObj.max_temp} with
    ${dayObj.weather.description};`
  }
}

// `weather` route with searchQuery
app.get('/weather', (request, response) => {
  const { lat, lon, searchQuery } = request.query;

  const city = weatherData.find(city => {
    return city.city_name.toLowerCase() === searchQuery.toLowerCase();
  });

  // error handling
  if (!city) {
    response.status(404).send({
      error: `No weather data found for ${searchQuery}.`
    });
    return;
  }

  const formattedWeather = city.data.map(day => new Forecast(day));
  response.send(formattedWeather);
});

// generic error handle
app.use((error, request, response, next) => {
  response.status(500).send({
    error: `Something went wrong on our server.`
  });
});

// starts server and 
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`)
});