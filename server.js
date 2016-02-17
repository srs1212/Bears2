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
app.get('/', function(req, res){
	res.render('index', {title: 'hellloooo world'});	
});

app.get('/about', function(req,res){
    var data = {};
    data.title = "What time is it";
    data.time = new Date();
    res.render('about', data);
});

var port = process.env.PORT || 8080;
var router = express.Router();

app.use('/api', bearRouter);

app.listen(port); // START THE SERVER
console.log('Magic happens on port ' + port);
