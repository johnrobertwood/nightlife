var express = require('express')
  , logger = require('morgan')
  , app = express()
  , path = require('path')
  , bodyParser = require('body-parser')
  , mongoose = require('mongoose')
  , Yelp = require('yelp')

var yelp = new Yelp({
  consumer_key: 'QoV-jJ8K1u5CnCqqj1y88Q',
  consumer_secret: 'LPg5lYBTaG0_UJplqgZlxsObAGc',
  token: 'ykVKebyBZgN_ovRKcbOCk72VDMPYa9mE',
  token_secret: 'fxBVaah7KAIFzjK9TWySZY0w91Q',
});

var userSchema = mongoose.Schema({
  user_id: String,
  screen_name: String,
  token: String
})

var barSchema = mongoose.Schema({
  city: String,
  places: Array
})

var User = mongoose.model('User', userSchema);

var Bar = mongoose.model('Bar', barSchema)

mongoose.connect('mongodb://'+
                  process.env.USER+':'+
                  process.env.MONGO_PW+
                  '@ds161028.mlab.com:61028/nightlife')

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('db open')
})
app.use(logger('dev'))
app.use(express.static(__dirname + '/app'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/search', function(req, res) {
  var location = req.body.city.split('').map(function(l) {
    return l.toLowerCase()
  }).join('')


  yelp.search({ term: 'bars', location: location, limit: 12 })
  .then(function(json) {
    var pubs = json.businesses.map(function(pub) {
      return Object.assign({}, pub, {
        count: 0,
        rsvps: []
      })
    })

    var newBar = new Bar({
      city: location,
      places: pubs
    })

    Bar.findOne({city: location}, function(err, bar1) {
      if (err) return console.error(err);
      if (!bar1) {
        newBar.save(function (err, bar) {
          if (err) return console.error(err);
        });
        res.json(newBar)
      } else {
        res.json(bar1)
      }
    });
  })
  .catch(function (err) {
    console.error(err);
  });
});

app.post('/addvote', function (req, res) {
  var location = req.body.loc.split('').map(function(l) {
    return l.toLowerCase()
  }).join('')
  Bar.findOne({city: location}, function(err, bar1) {
    if (err) return console.error(err);
    for (var i = 0; i < bar1.places.length; i++) {
      if (bar1.places[i].name === req.body.name) {
        var list = bar1.places[i].rsvps
        if (!list.some(function(l) { return l === req.body.user})) {
          bar1.places[i].rsvps.push(req.body.user)
        } else {
          bar1.places[i].rsvps = bar1.places[i].rsvps.filter(function(r) {
            return r !== req.body.user
          })
        } 
      }
    }
    Bar.update({city: location}, { $set: { places: bar1.places}}, function() {
      res.json(bar1);
    })
  });
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
})
