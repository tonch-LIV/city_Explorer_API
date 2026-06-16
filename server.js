// import statements equivalent
const express = require('express');  // builds backend
const cors = require('cors');  // lets front and back communicate regfardless of port 
const axios = require('axios');
require('dotenv').config();  // loads env variables from .env 


// console.log(weatherData);

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

// `weather` route with lat and lon from frontend
app.get('/weather', async (request, response, next) => {
  try {
    const { lat, lon, searchQuery } = request.query;

    const weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=5`;

    const weatherResponse = await axios.get(weatherURL);

    // const city = weatherData.find(city => {
    //   return city.city_name.toLowerCase() === searchQuery.toLowerCase();
    // });

    // // error handling
    // if (!city) {
    //   response.status(404).send({
    //     error: `No weather data found for ${searchQuery}.`
    //   });
    //   return;
    // }

    const formattedWeather = weatherResponse.data.data.map(day => new Forecast(day));
    
    response.send(formattedWeather);
  } catch (error) {
    next(error);
  }  
});

////////////

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
