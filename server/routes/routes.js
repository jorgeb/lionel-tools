var request = require('request');
var Crawler = require("crawler");
var url = require('url');


var appRouter = function (app) {
    app.get("/url/:url", function (req, resExt) {

        var c = new Crawler({
            maxConnections: 10,
            // This will be called for each crawled page
            callback: function (error, res, done) {
                if (error) {
                    console.log(error);
                } else {
                    resExt.send(res.body);
                }
                done();
            }
        });
        console.log(req.params.url);
        c.queue(req.params.url);
/*
        request('http://www.google.com', function (error, response, body) {
            if (!error && response.statusCode === 200) {
                // from within the callback, write data to response, essentially returning it.
                res.send(body);
            }
        });

        */
    });
};

module.exports = appRouter;