// LIRIbot commands
// - node liri.js concert-this '<artist/band name here>'
// - node spotify-this-song '<song name here>'
// - node liri.js movie-this '<movie name here>'

require("dotenv").config();

var Spotify = require('node-spotify-api');
// console.log(Spotify);
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
// var spotify = new Spotify({
//   id: '193b51795e6140a58d870823049a2bc7',
//   secret: 'eef884e0e6484bba8bfd67310e331256'
// });


// console.log(spotify);

var axios = require("axios");

var moment = require('moment');
// moment().format();



var requestRaw = process.argv.splice(3, process.argv.length - 1);
var request = requestRaw.join('');

var command = process.argv[2];
// console.log(command);
// console.log(artist);

// console.log(artist);
var bandsQueryUrl = `https://rest.bandsintown.com/artists/${request}/events?app_id=codingbootcamp`;
var movieQueryUrl = `http://www.omdbapi.com/?t=${request}&y=&plot=short&apikey=trilogy`;


if (command == 'spotify-this-song') {
  spotify
  .search({ type: 'track', query: `${request}`, limit: '1' })
  .then(function(response) {
    console.log(response.tracks.items);
  })
  .catch(function(err) {
    console.log(err);
  });
  
  // spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  //   if (err) {
  //     return console.log('Error occurred: ' + err);
  //   }
  
  // console.log(data); 
  // });
}
  
  if (command == 'concert-this') {
    axios
      .get(bandsQueryUrl)
      .then(function(response) {
          console.log(`Venue Name: ${response.data[1].venue.name}`); // Name of Venue
          console.log(`Venue Location: ${response.data[1].venue.city}, ${response.data[1].venue.country}`); // Venue location
          
          var concertDateTime = response.data[1].datetime;
          var convertedDate = moment(`${concertDateTime}`).format("MM-DD-YYYY");
          var convertedTime = moment(`${concertDateTime}`).format("hh:mm A");
          console.log(`Date & Time of Event: ${convertedDate}, ${convertedTime}`); //Time of Event
      })

      .catch(function(error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else { 
          console.log("Error", error.message);
        }
        console.log(error.config);
      }
    );
  }

  if (command == 'movie-this') {
    axios
      .get(movieQueryUrl)
      .then(function(response) { 
        var movieTitle = response.data.Title;
        var releaseYear = response.data.Year;
        var ratingIMDB = response.data.Ratings[0].Value;
        var ratingRot = response.data.Ratings[1].Value;
        var country = response.data.Country;
        var language = response.data.Language;
        var plot = response.data.Plot;
        var actors = response.data.Actors;

        console.log(`Title: ${movieTitle}`);
        console.log(`Year: ${releaseYear}`);
        console.log(`IMDB Rating: ${ratingIMDB}`);
        console.log(`Rotten Tomatoes Rating: ${ratingRot}`);
        console.log(`Country of Origin: ${country}`);
        console.log(`Language: ${language}`);
        console.log(`Plot: ${plot}`);
        console.log(`Actors: ${actors}`);
      })

      .catch(function(error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      }
    );


  }

  