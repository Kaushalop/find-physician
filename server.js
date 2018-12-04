var express    = require('express');        // call express
var app        = express();
var errorHandler = require('api-error-handler');
var bodyParser = require('body-parser');
var cors =  require('cors');

var mongoose   = require('mongoose');
var Schema       = mongoose.Schema;

var summarisedPhysicianSchema = new Schema({
    name: String,
    address: String
});

var Physician = mongoose.model('summarisedPhysician', summarisedPhysicianSchema, 'physicians');


process.on('uncaughtException', function (err) {
    console.log(err);
  })


mongoose.connect('mongodb://root:root123@ds139949.mlab.com:39949/physiciansaffinance');

//check db conn
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('conn');
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var port = process.env.PORT || 8080;
var router = express.Router();
// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('This is in the middle!.');
    next(); // make sure we go to the next routes and don't stop here
});
//{ name : { $regex : search } }
router.route('/physicians')
.get(function(req, res) {
    //{ 'name' : { '$regex' : search, '$options' : 'i' } }
    if(req.query.search) {
        Physician.find({ 'name' : { '$regex' : req.query.search, '$options' : 'i' } }, function(err, bears) {
            if (err) {
                console.log('Error');
                res.send(err);
            }
            res.json(bears);
        });
    } else {
        Physician.find(function(err, bears) {
            if (err) {
                console.log('Error');
                res.send(err);
            }
            res.json(bears);
        });
    }
    
})


app.use(errorHandler());
app.use(router);
app.listen(port);
console.log('Kicked off at ' + port);