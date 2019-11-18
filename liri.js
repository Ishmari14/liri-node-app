require("dotenv").config();

///setting variables for the api calls///

var keys = require("./keys.js");

var Spotify = require("node-spotify-api");

var axios = require("axios");

var fs = require("fs");

var moment = require("moment");

///user inputs for liri///

var inputCommand = process.argv[2];