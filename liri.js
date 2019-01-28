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
var request = requestRaw.join(' ');
var command = process.argv[2];
var resultsRaw = [];


function liriSearch() {

  //  QUERY URLS
  var bandsQueryUrl = `https://rest.bandsintown.com/artists/${request}/events?app_id=codingbootcamp`;
  var movieQueryUrl = `http://www.omdbapi.com/?t=${request}&y=&plot=short&apikey=trilogy`;

  // NODE-SPOTIFY-API
  if (command == 'spotify-this-song') {
    spotify
    .search({ type: 'track', query: `${request}`, limit: 1 })
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
      
      resultsRaw.push(`Track Name: "${trackName}"`,
                    `Artist(s): ${artistName}`,
                    `Album: ${albumName}`,
                    `Preview Link: ${previewURL}`,
                    ``,
                    `--------------------------------- \n`);

      results = `${resultsRaw.join('\n')} \n`;
      logSearch();
                    

      console.log(`Track Name: "${trackName}"`);
      console.log(`Artist(s): ${artistName}`);
      console.log(`Album: ${albumName}`);
      console.log(`Preview Link: ${previewURL}`);

    })
    .catch(function(err) {
      console.error(`I'm sorry. I don't know that one, I hope you enjoy this.`); 

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

        resultsRaw.push(`Track Name: "${trackName}"`,
                    `Artist(s): ${artistName}`,
                    `Album: ${albumName}`,
                    `Preview Link: ${previewURL}`,
                    ``,
                    `--------------------------------- \n`);

          results = `${resultsRaw.join('\n')} \n`;
          logSearch();
        
        })
        .catch(function(err) {
          console.error('Error occurred: ' + err); 
        });
    });
  }

  // AXIOS - BANDS IN TOWN
  if (command == 'concert-this') {
    axios
      .get(bandsQueryUrl)
      .then(function(response) {
        for (i=0; i < 5; i++) {
          var lineup = response.data[i].lineup.join(', ');
          var concertDateTime = response.data[i].datetime;
          var convertedDate = moment(`${concertDateTime}`).format("MM-DD-YYYY");
          var convertedTime = moment(`${concertDateTime}`).format("hh:mm A");
          resultsRaw.push(``,
                          `Lineup: ${lineup}`,
                          `Venue Name: ${response.data[i].venue.name}`,
                          `Venue Location: ${response.data[i].venue.city}, ${response.data[i].venue.country}`,
                          `Date & Time of Event: ${convertedDate}, ${convertedTime}`,
                          ``,
                          `---------------------------------`);

          results = `${resultsRaw.join('\n')}`;
          
        }

        console.log(`
                      ${results}`);
          logSearch();
      })

      .catch(function(error) {
        console.error(`Sorry. I couldnt find any concert information for '${request}'.`);
      });
  }

  //AXIOS - OMDB
  if (command == 'movie-this') {
    axios
      .get(movieQueryUrl)
      .then(function(response) { 
        // console.log(response);
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

        resultsRaw.push(`Title: ${movieTitle}`,
                        `Year: ${releaseYear}`,
                        `IMDB Rating: ${ratingIMDB}`,
                        `Rotten Tomatoes Rating: ${ratingRot}`,
                        `Country of Origin: ${country}`,
                        `Language: ${language}`,
                        `Plot: ${plot}`,
                        `Actors: ${actors}`,
                        ``,
                        `--------------------------------- \n`);

          results = `${resultsRaw.join('\n')} \n`;
          logSearch();
      })

      .catch(function(error) {
       console.error(`Sorry. I couldnt find any movie information for '${request}'.`);
      }
    );


  }
  
}

function randomSearch() {
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

  
}


function logSearch() {

    fs.appendFile("log.txt", `Okay, here's what I found: \n ${results}`, function(err) {
      if (err) {
        return console.log(err);
      }
    });
}

// RUN FEATURES
liriSearch();
randomSearch();

  