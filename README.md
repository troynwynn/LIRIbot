# LIRIbot

## Introduction
LIRI is a _Language_ Interpretation and Recognition Interface. LIRI will be a command line node app that takes in parameters and gives you back data. It retrieves and returns data via various API calls.

## Required Files
* `liri.js`
* `keys.js`
* `random.txt`
* `log.txt`
## Required packages & APIs
* [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)

* [Axios](https://www.npmjs.com/package/axios)

* [OMDB API](http://www.omdbapi.com) 

* [Bands In Town API](http://www.artists.bandsintown.com/bandsintown-api)

* [Moment](https://www.npmjs.com/package/moment)

* [DotEnv](https://www.npmjs.com/package/dotenv)

* [fs](pre-installed-in-node)

## Command Line Calls

* `concert-this` - returns...
    * concert lineup 
    * concert venue
    * concert location 
    * Data + time of the event

* `spotify-this-song` - returns...
    * song title
    * artist 
    * album 
    * preview link URL

* `movie-this` - returns...
    * Title of the movie
    * Year the movie came out
    * IMDB Rating of the movie
    * Rotten Tomatoes Rating of the movie
    * Country where the movie was produced
    * Language of the movie
    * Plot of the movie
    * Actors in the movie

* `do-what-it-says` - pulls a random command and random request from `random.txt`


## Output Files
* `log.txt` - keeps a log history of the information that LIRL correctly retrieves

## Security
* `.env` holds the Spotify Client ID & Client Secret keys, which are exported to `keys.js`

* `.gitignore` created to keep Spotify Client ID & Client Secret strictly local

