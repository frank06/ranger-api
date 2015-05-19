var express = require('express');
var bodyParser = require('body-parser');
var redis = require("redis");

var app = express(),
  client = redis.createClient();
  
app.use(bodyParser.json());

var server = app.listen(3000);

app.get('/:user', function (req, res) {
  
  client.smembers(req.params.user, function (err, result) {
    var result = result.map(function (id) {
      return { id: id, site: new Buffer(id, 'base64').toString() }
    });
    res.json(result);
  });
});

app.get('/:user/:site', function (req, res) {
  
  var id = [req.params.user, req.params.site].join(':');
  
  client.sort(id, "alpha", "get", id + ":*", function (err, result) {
    res.send(result);
  });
  
});

app.put('/:user/:site/:id', function (req, res) {
  
  var user = req.params.user,
    site = req.params.site,
    id = req.params.id;
  
  client.multi()
    .sadd(user, site)
    .sadd([user, site].join(':'), id)
    .set([user, site, id].join(':'), JSON.stringify(req.body))
    .exec(function (err, result) {
      res.json(result);
    });
 
});

app.delete('/:user/:site/:id', function (req, res) {
  
  var user = req.params.user,
    site = req.params.site,
    id = req.params.id;
  
  client.multi()
    .srem([user, site].join(':'), id)
    .del([user, site, id].join(':'))
    .exec(function (err, result) {
      res.json(result);
    });
 
});