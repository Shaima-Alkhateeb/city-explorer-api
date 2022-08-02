'use strict';

//1st (DOTENV) read our environment variable:
require('dotenv').config();


//2nd (instal express ,cors ) application Dependencies:
const express = require('express');
const cors = require('cors');


//3rd application setup:
//for port:
const PORT = process.env.PORT || 4000;
//for server or app:
const app = express();
//for cors:
app.use(cors());



//4th create your routes + routes handler :
app.get('/weather', (req, res) => {
  let searchQuery = req.query.searchQuery;
  const city = weatherData.find(city => city.city_name.toLocaleLowerCase() === searchQuery.toLocaleLowerCase());

  try {
    const weatherArr = city.data.map(item => new Forecast(item));
    res.status(200).send(weatherArr);
  } catch (error) {
    handlerError(error, res);
    //or rather than the function handlerError
    // res.status(500).send('Something went wrong :(');

  }


});

//function to handele if the user enter city that not exist
function handlerError(error, res) {
  res.status(500).send('Something went wrong :(');
}

//Data that will display on the postman
class Forecast {
  constructor(day) {
    this.date = day.valid_date;
    this.description = day.weather.description;
  }
}


const weatherData = require('./data/weather.json');

console.log(weatherData);

app.listen(PORT, () => {
  console.log('The server is working ^_^ yahoooo');
});
