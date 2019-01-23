// LIRIbot commands
// - node liri.js concert-this '<artist/band name here>'
// - node spotify-this-song '<song name here>'
// - node liri.js movie-this '<movie name here>'


// Required Packages
require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require('moment');
var fs = require("fs");

// Parsed terminal requests
var requestRaw = process.argv.splice(3, process.argv.length - 1);
var request = requestRaw.join('');
var command = process.argv[2];


function liriSearch() {

  var bandsQueryUrl = `https://rest.bandsintown.com/artists/${request}/events?app_id=codingbootcamp`;
  var movieQueryUrl = `http://www.omdbapi.com/?t=${requestRaw}&y=&plot=short&apikey=trilogy`;


  if (command == 'spotify-this-song') {
    spotify
    .search({ type: 'track', query: `${requestRaw}`, limit: 1 })
    .then(function(response) {

      // Display multiple artists
      if (response.tracks.items[0].artists.length >= 2) {
        var artistName = [response.tracks.items[0].artists[0].name];
        for (i=1; i<response.tracks.items[0].artists.length; i++) {
          artistName.push(` ${response.tracks.items[0].artists[i].name}`); // Artist Name (if it's more than 1)
      }
    }

      else {
        var artistName = response.tracks.items[0].artists[0].name;
      }
      var trackName = response.tracks.items[0].name;
      var previewURL = response.tracks.items[0].preview_url;
      var albumName = response.tracks.items[0].album.name;
      
      console.log(`Track Name: "${trackName}"`);
      console.log(`Artist(s): ${artistName}`);
      console.log(`Album: ${albumName}`);
      console.log(`Preview Link: ${previewURL}`);

    })
    .catch(function(err) {
      console.error('Error occurred: ' + err); 

      spotify
      .request('https://api.spotify.com/v1/tracks/3Gxku40T2RGPqtLYpFAngP')
        .then(function(data) {
        var artistName = data.artists[0].name; // Artist Name
        var trackName = data.name;
        var previewURL = data.preview_url;
        var albumName = data.album.name;
        
        console.log(`Track Name: "${trackName}"`);
        console.log(`Artist: ${artistName}`);
        console.log(`Album: ${albumName}`);
        console.log(`Preview Link: ${previewURL}`);
        
        })
        .catch(function(err) {
          console.error('Error occurred: ' + err); 
        });
    });
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
        console.log(response);
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
}

liriSearch();

  if (command == 'do-what-it-says') {
    fs.readFile('random.txt', 'utf-8', function(error, data) { 
      
      if (error) {
        return console.log(error);
      }

      console.log(data);
      var randomReq = data.split(",");
      console.log(randomReq);
      command = randomReq[0];
      request = randomReq[1];
      liriSearch();

    });




  }

  