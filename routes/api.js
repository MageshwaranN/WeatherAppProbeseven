var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://magesh89:12Nov1989@ds043714.mlab.com:43714/optimizerapp', ['probSeven']);

db.on('connect', function () {
    console.log('database connected')
})

db.on('error', function (err) {
    console.log('Connection errored', err);
});

//api for saving weather for a city
router.route('/weather')

    .post(function(req,res){

        var weatherToSave = req.body.saveWeather;
        db.probSeven.save(weatherToSave, function(err, task){
            if(err){
                res.send(err);
            }
            res.json(task);
        });
    })

    .get(function(req,res){

        var findCity = req.query.city;
        findCity = findCity.replace(findCity.charAt(0), findCity.charAt(0).toLocaleUpperCase());
        db.probSeven.find({name : findCity}, function(err, task){
            console.log(task)
            if(err){
                res.send(err);
            }
            res.json(task);
        });
    })

module.exports = router;