	var express = require('express');
	var router = express.Router();
	var Bear = require('../app/models/bear');


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

	})
	});
	router.route('/bears')

    // create a bear (accessed at POST http://localhost:8080/api/bears)

	.get(function(req, res){
		Bear.find(function(err, bears){
			if(err){
				console.log(err);
			}else {
				res.json(bears);
			}	
		});
	});

	router.route('/bears/:bear_id')
	.get(function(req, res){
		Bear.findById(req.params.bear_id,function(err, bear){
		if(err) {
			console.log(err);
		} else {
			res.json(bear);
		}
	  });
	})

	.put(function(req, res){
		Bear.findById(req.params.bear_id,function(err, bear){
			if(err) {
				console.log(err);
			} else {
				bear.name = req.body.name ? req.body.name : bear.name;
				bear.age = req.body.age ? req.body.age : bear.age;
				bear.gender = req.body.gender ? req.body.gender : bear.gender;

				bear.save(function(err){
					if(err){
						console.log(err);
					}else {
						res.json({title: 'Bear updated'});
					}
			    });
	  		}
   	     });
	})

	.delete(function(req, res) {
        Bear.remove({_id: req.params.bear_id}, function(err, bear) {
            if (err) {
            	console.log(err);
            } else {
          	res.json({ title: 'successfully deleted' });
        	}
        });
    });




// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

module.exports = router;