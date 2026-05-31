// import statements equivalent
const express = require('express');  // builds backend
const cors = require('cors');  // lets front and back communicate regfardless of port 
require('dotenv').config();  // loads .env for 

//  creates server
const app = express();
app.use(cors());  // turns on CORS

const PORT = process.env.PORT || 3001;

// starts server and 
app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`)
});