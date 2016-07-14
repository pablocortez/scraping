var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/', function(req, res){
    // The URL we will scrape from - in our example Anchorman 2.

    url = 'http://www.gunviolencearchive.org/reports/mass-shooting';

    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html

    request(url, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the request

        if(!error){
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

            var $ = cheerio.load(html);

            // Finally, we'll define the variables we're going to capture

            var date, city, state, killed, injured;
            var json = { date : "", city : "", state : "", killed: "", injured: "" };


            $('tbody').filter(function(){

           // Let's store the data we filter into a variable so we can easily see what's going on.

                var data_received = $(this);

           

                date = data_received.children().first().text();
                date = date.substring(0, 13);


           // Once we have our title, we'll store it to the our json object.

                json.date = date;
                console.log(typeof date);
                console.log(date);
                
            })


// var cells = document.getElementsByTagName('td')
// undefined



        }
    })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;