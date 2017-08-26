var TYPES = require('tedious').TYPES;

var request = require('request');
var Crawler = require("crawler");
var url = require('url');


var  apiSQL= {};

apiSQL.creatLionelImage = function(req, resExt){
    try {
      req.query("exec createLionelImage @image")
          .param('image', JSON.stringify(req.body), TYPES.NVarChar)
          .into(resExt, '[]');
          //.exec(resExt);
      }
      catch (err){
          console.log(req.body);
      }
}

module.exports = apiSQL;