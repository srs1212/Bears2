var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');    // configure app to use bodyParser()
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/animals');

var Bear = require('./app/models/bear');

app.use(bodyParser.urlencoded({ extended: true })); //mounting middleware
app.use(bodyParser.json());

var port = process.env.PORT || 8080; 		//lets us see environment of process in this case of the port 

var router = express.Router();             

router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/bears')
	.post(function(req, res){
		var bear = new Bear();
		bear.name = req.body.name;
		bear.age = req.body.age;
		bear.gender = req.body.gender;

		bear.save(function(err,bear) {
			if(err){
				console.log(err);
			} else {
				res.json(bear);
			}	

		});
	});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

app.use('/api', router);



app.listen(port); // START THE SERVER
console.log('Magic happens on port ' + port);
