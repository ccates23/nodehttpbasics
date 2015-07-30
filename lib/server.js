var express = require('express');
var cheerio = require('cheerio');


var http = require('http');
var https = require('https');
var request = require('request');

module.exports = function(port) {
 http.createServer(function (req, res) {
  if (req.method === 'GET' && req.url === '/hello') {
    res.end('Hello World!');
}

  else if(req.method === 'GET' && req.url === '/news') {
    request.get('http://reddit.com', function (err, xhr, body) {
      $ = cheerio.load(body);
      $('a').attr('href', 'https://www.youtube.com/watch?v=kj9neRVZVDQ');
      res.end($.html())
    });
    }

  else if(req.method === 'GET' && req.url === '/news') {
    request.get('http://reddit.com', function (err,xhr, body) {
      res.end($(body).find('#siteTable a.title').first().text());
    });
  }

   else if (req.method === 'GET' && req.url === '/weather') {
    var API_KEY = '8d12e4ab8fb43e0946453b165889ac02';
    var LOCATION = '36.1658,-86.7777';

    res.writeHeader(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });

    https.get('https://api.forecast.io/forecast/' + API_KEY + '/' + LOCATION)
      .on('response', function (xhr) {
        xhr.pipe(res);
        // xhr
        //   .on('data', function (chunk) {
        //     res.write(chunk);
        //   })
        //   .on('end', function () {
        //     res.end();
        //   });
      });

  } else {
    res.writeHead(403);
    res.end('Access Denied!');
  }

  }).listen(1337);
}