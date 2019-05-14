require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var moment = require('moment');
var fs = require("fs");


var oper = process.argv[2];
var item = process.argv.slice(3).join(" ");


function f1(oper, item) {
  if (oper === "spotify-this-song") {
    var song = (item || "The Sign");
    spotify.search({ type: 'track', query: song, limit: 10 }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      for (let i = 0; i < data.tracks.items.length; i++) {
        console.log("Artist: " + data.tracks.items[i].artists[0].name);
        console.log("Song name: " + data.tracks.items[i].name);
        console.log("Album: " + data.tracks.items[i].album.name);
        console.log("----------------------------------------");
        f2("Artist: " + data.tracks.items[i].artists[0].name + " Song name: " + data.tracks.items[i].name + " Album: " + data.tracks.items[i].album.name);
      }

    });


  }

  else
    if (oper === "concert-this") {

      axios.get("https://rest.bandsintown.com/artists/" + item + "/events?app_id=codingbootcamp").then(
        function (response) {
          for (let i = 0; i < response.data.length; i++) {
            console.log("Date: " + moment(response.data[i].datetime).format('MM/DD/YYYY'));
            console.log("Country: " + response.data[i].venue.country);
            console.log("City: " + response.data[i].venue.city);
            console.log("Venue: " + response.data[i].venue.name);
            console.log("----------------------------------------");
            f2("Date: " + moment(response.data[i].datetime).format('MM/DD/YYYY') + " Country: " + response.data[i].venue.country + " City: " + response.data[i].venue.city + " Venue: " + response.data[i].venue.name);
          }
        }
      ).catch(function (error) {
        console.log(error);
      });

    }



    else
      if (oper === "movie-this") {
        var movie = (item || "Mr Nobody");
        axios.get("http://www.omdbapi.com/?apikey=d911b348&t=" + movie).then(
          function (response) {

            console.log("Movie title: " + response.data.Title);
            console.log("Released: " + response.data.Released);
            console.log("IMDB rating: " + response.data.imdbRating);
            console.log("Rotten Tomatoes rating: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Languages: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            f2(" Movie title: " + response.data.Title + " Released: " + response.data.Released + " Actors: " + response.data.Actors)
          }
        ).catch(function (error) {
          console.log(error);
        });

      }



      else
        if (oper === "do-what-it-says") {

          fs.readFile("random.txt", "utf8", function (error, data) {

            if (error) {
              return console.log(error);
            }


            //console.log(data);
            var dataArr = data.split(",");
            //console.log(dataArr);
            f1(dataArr[0], dataArr[1])

          });


        }


}

f1(oper, item);
function f2(param) {
  fs.appendFile("log.txt", param, function (err) {

    // If an error was experienced we will log it.
    if (err) {
      console.log(err);
    }



  });
}