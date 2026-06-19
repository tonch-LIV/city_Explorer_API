const axios = require('axios');
const cache = require('./cache');

// Cache results for one hour
const CACHE_DURATION = 1000 * 60 * 60;

class Forecast {
  constructor(day) {
    this.date = day.datetime;
    this.description = `Low of ${day.low_temp}, high of ${day.max_temp} with ${day.weather.description};`
  }
}

// `weather` route turned into handlerFunction; uses lat and lon from frontend
async function handleWeather(request, response, next) {
  try {
    const { lat, lon } = request.query;
    const cacheKey = `weather-${lat}-${lon}`;

    // Check for fresh cached data before calling WeatherBit
    const cacheEntry = cache[cacheKey];  

    // sends data if available; if not, calls Weatherbit for new results to send and save
    if (cacheEntry && Date.now() - cacheEntry.timestamp < CACHE_DURATION) {
      console.log('Weather cache hit');
      response.send(cacheEntry.data);
      return;
    }

    console.log('Weather cache miss');

    const weatherURL = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}&days=5`;

    const weatherResponse = await axios.get(weatherURL);

    const formattedWeather = weatherResponse.data.data.map(day => new Forecast(day));

    cache[cacheKey] = {
      timestamp: Date.now(),
      data: formattedWeather
    };
    
    response.send(formattedWeather);
  } catch (error) {
    next(error);
  }  
}

module.exports = handleWeather;