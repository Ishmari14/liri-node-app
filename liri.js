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
            console.log("Please enter one of the following commands: 'concert-this', 'spotify-this-song', 'movie-this,', 'do-what-it-says'")

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

function bandsInTownsGet(artist) {
    var artist = inputSearch;
    var bandQueryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    axios.get(bandQueryURL).then(function (response) {
        console.log("-----------------------");
        console.log("Name of the Venue: " + response.data[0].venue.name + "\r\n");
        console.log("Venue Location: " + response.data[0].venue.city + "\r\n");
        console.log("Event Date: " + moment(response.data[0].datetime).format("MM-DD-YYYY") + "\r\n");
        console.log("-----------------------");

        var concertLog = "Concert Log Entry" + "\nName of the musician: " + artist + "\nName of the venue: ";

        fs.appendFile("log.txt", concertLog, function (err) {
            if (err) throw err;
        });

    });
};

function ombdGet(movie) {
    if (!movie) {
        movie = "Mr. Nobody";
    }

    var movieQueryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    axios.request(movieQueryURL).then(
        function (response) {
            console.log("--------------------------------------");
            console.log("Title: " + response.data.Title + "\r\n");
            console.log("Year Released: " + response.data.Year + "\r\n");
            console.log("IMDB Rating: " + response.data.imdbRating + "\r\n");
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\r\n");
            console.log("Country where the movie was produced: " + response.data.Country + "\r\n");
            console.log("Language: " + response.data.Language + "\r\n");
            console.log("Plot: " + response.data.Plot + "\r\n");
            console.log("Actors: " + response.data.Actors + "\r\n");

            var movieLog = "Movie Log Entry" + "\nMovie title: " + response.data.Title + "\nYear Released: " + response.data.Year;

            fs.appendFile("log.txt", movieLog, function (err) {
                if (err) throw err;
            });
        }
    )
};

function randomGet() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);

        } else {
            console.log(data);

            var randomData = data.split(",");
            runLiri(randomData[0], randomData[1]);
        }
    });
}

function resultsLogged(data) {
    fs.appendFile("log.txt", data, function (err) {
        if (err) throw err;
    });
};

runLiri(inputCommand, inputSearch);