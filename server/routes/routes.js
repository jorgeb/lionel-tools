var TYPES = require('tedious').TYPES;

var request = require('request');
var Crawler = require("crawler");
var url = require('url');

var apiSQL = require("../api/sql-lionel-db");

var appRouter = function (app) {
    app.get("/url/:url", function (req, resExt) {

        var c = new Crawler({
            maxConnections: 10,
            // This will be called for each crawled page
            callback: function (error, res, done) {
                if (error) {
                    console.log(error);
                    console.log(req.params.url);
                } else {
                    resExt.send(res.body);
                }
                done();
            }
        });
        c.queue(req.params.url);
    });

    app.get("/sql/:table/:id", function (req, resExt) {
        console.log(req.params.table,req.params.id);
        req.query(`select * from ${req.params.table} where Id = ${req.params.id} for json path`)
        .into(resExt, '[]');
    });

    app.get("/sql/:table", function (req, resExt) {
        console.log(req.params.table);
        req.query(`select * from ${req.params.table} for json path`)
        .into(resExt, '[]');
    });
//"LionelId":"2025","Title":"vMM","Description":"ywap","LionelEraId":"1"
    app.post('/sql/LionelItem', function (req, resExt) {
        try {
        req.query("exec createLionelItem @item")
            .param('item', JSON.stringify(req.body), TYPES.NVarChar)
            .exec(resExt);
        }
        catch (err){
            console.log(req.body);
        }
    });
    app.post('/sql/LionelImage', function (req, resExt) {
        
        apiSQL.creatLionelImage(req, resExt);
    });

};

module.exports = appRouter;