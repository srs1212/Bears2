var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');    // configure app to use bodyParser()
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/animals');

var bearRouter= require('./routes/bear');
var Bear = ('./app/models/bear');

app.use(bodyParser.urlencoded({ extended: true })); //mounting middleware
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.get('/', function(req,res){
	res.render('index', {title: 'hellloooo world'});	
});

var port = process.env.PORT || 8080; 		//lets us see environment of process in this case of the port 

var router = express.Router();             

router.use(function(req, res, next){
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

app.use('/api', bearRouter);

app.listen(port); // START THE SERVER
console.log('Magic happens on port ' + port);
