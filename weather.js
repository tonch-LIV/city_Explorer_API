const axios = require('axios');


class Forecast {
  constructor(day) {
    this.date = day.datetime;
    this.description = `Low of ${day.low_temp}, high of ${day.max_temp} with ${day.weather.description};`
  }
}

// `weather` route turned into handlerFunction with lat and lon from frontend
async function handleWeather(request, response, next) {
  try {
    const { lat, lon } = request.query;

    const weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=5`;

    const weatherResponse = await axios.get(weatherURL);

    const formattedWeather = weatherResponse.data.data.map(day => new Forecast(day));
    
    response.send(formattedWeather);
  } catch (error) {
    next(error);
  }  
}


module.exports = handleWeather;