// LIRIbot commands
// - node liri.js concert-this '<artist/band name here>'
// - node spotify-this-song '<song name here>'
// - node liri.js movie-this '<movie name here>'

require("dotenv").config();

var axios = require("axios");

var moment = require('moment');
// moment().format();

var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);

var command = process.argv.splice(3, process.argv.length - 1);
var artist = command.join('');

// console.log(artist);
var bandsQueryUrl = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`;

axios
  .get(bandsQueryUrl)
  .then(function(response) {
      console.log(`Venue Name: ${response.data[1].venue.name}`); // Name of Venue
      console.log(`Venue Location: ${response.data[1].venue.city}, ${response.data[1].venue.country}`); // Venue location
      var concertDateTime = response.data[1].datetime;
      // var concertTime = response.data[1].datetime;
      // console.log(concertTime);
      var convertedDate = moment(`${concertDateTime}`).format("MM-DD-YYYY");
      var convertedTime = moment(`${concertDateTime}`).format("hh:mm A");
      // var hours = convertedTime.splice(2, convertedTime.length-1);
      // console.log(convertedTime);

      console.log(`Date & Time of Event: ${convertedDate}, ${convertedTime}`); //Time of Event
    // If the axios was successful...
    // Then log the body from the site!
    // var date = response.data.Year;
    // console.log(response.data);
    // console.log(`The moving release date was: ${date}`);
  })

  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  }
);
