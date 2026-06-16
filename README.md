# city_Explorer_API

backend repo for city explorer

## changelog

- 05.30
  - created branch `devSetup`.
  - created `package.json`.
  - installed `express`, `cors`, `dotenv`; creating `package-lock.json` file node modules sub-directory.
  - created files;
    - `server.json`
    - `.env`
    - `.gitignore`
    - `eslintrc.json`
    - `./data/weather.json`
  -  configured .gitignore
  -  configured .env
  - added `weather.json` data to file.
  - imported packages that were installed (`express`, `cors`, `dotenv`) into `server.json`.
    - created server `app`
    - turned on CORS
    - implemented port selection from `.env`
    - started app `app.listen`.
    - verified message.
  - imported weather data from `./data/weather.json`; ran and tested output.
  - added `/weather` route and created a search query function to search city's weather.
  - created `Forecast` class and updated `/weather` route response in `server.js`.
  - added error message `!city` based on status code (404) and generic response for (500).
  - created `Weather.jsx` in frontend/ `city_Explorer`.
- 06.14
  - created `WEATHER_API_KEY` in `.env`.
  - installed axios through terminal.
  - updated `Forecast` class with `day.datetime` syntax.
  - updated `/weather` route with `try` and `catch`.
- 06.15
  - cleanup of comments and redundant code blocks in  `server.js`.
  - added `MOVIE_API_KEY` in `.env`.
  - added a test `/movies` route on `server.js`.
  - created `Movie` class.
  - updated `/movies` route to include actual ouptut alongside `try`/`catch`.
- 06.16* (forgot to define date and changes made... think this is where it began for the day...)
  - added failsafe for broke poster url images.
  - created `weather.js`.
  - moved `Forecast` class, `/weather` contents (as handlerFunction) into `weather.js`.
  - added `axios` to `weather.js` since it will handle make the Weatherbit requests.
  - turned `/weather` into handlerFunction and exported it; `weather.js`.
  - imported `weather.js` into `server.js` and added route.
  - test successful w/ cleaned 5-day forecast.
  - created `movies.js` and moved `Movie` class into file.
  - converted `/movies` route into handlerFunction and exported it.