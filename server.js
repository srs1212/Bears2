var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');    // configure app to use bodyParser()
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/animals');

app.use(bodyParser.urlencoded({ extended: true })); //mounting middleware
app.use(bodyParser.json());

var port = process.env.PORT || 8080; 		//lets us see environment of process in this case of the port 

var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

app.use('/api', router);



app.listen(port); // START THE SERVER
console.log('Magic happens on port ' + port);
