require("dotenv").config();

///setting variables for the api calls///

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var axios = require("axios");

///read and write///
var fs = require("fs");

var moment = require("moment");

///user inputs for liri///

var inputCommand = process.argv[2];

var inputSearch = process.argv.slice(3).join(" ");

///function for liri to operate///

function runLiri(inputCommand, inputSearch) {

    switch (inputCommand) {
        case "concert-this":
            bandsInTownsGet(inputSearch);
            break;

        case "spotify-this-song":
            spotifyGet(inputSearch);
            break;

        case "movie-this":
            ombdGet(inputSearch);
            break;

        case "do-what-it-says":
            randomGet(inputSearch);
            break;


        ///if search is blank, display this///
        default:
            console.log("Please enter one of the following commands: 'concert-this', 'spotify-this-song', 'movie-this,'")

    }
};

///Spotify API//

function spotifyGet()


runLiri(inputCommand, inputSearch);