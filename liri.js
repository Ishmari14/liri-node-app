require("dotenv").config();

///setting variables for the api calls///

var keys = require("./keys.js");

var Spotify = require('node-spotify-api')

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

function spotifyGet(nameSong) {

    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: nameSong }, function (err, data) {
        if (err)
            return console.log('Error: ' + err);


        console.log("-----------------------------------");
        console.log("Artist(s): " + data.tracks.items[0].album.artists[0].name + "\r\n");
        console.log("Song: " + data.tracks.items[0].name + "\r\n");
        console.log("Album: " + data.tracks.items[0].album.name + "\r\n");
        console.log("Preview: " + data.tracks.items[0].href + "\r\n");
        console.log("-----------------------------------");

        var songLog = "Spotify Song Log" + "\nArtist: " + data.track.items[0].name;

        fs.appendFile("log.txt", songLog, function (err) {

            if (err) throw err;
        });

    });

};





runLiri(inputCommand, inputSearch);