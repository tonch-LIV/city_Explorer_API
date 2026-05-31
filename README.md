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
  - 