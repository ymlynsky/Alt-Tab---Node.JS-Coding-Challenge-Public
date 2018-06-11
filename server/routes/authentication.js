var express = require('express');
var router = express.Router();

var User = require('../model/User');

router.post('/api/register', (req, res) => {

    var user = new User({
        email: req.body.email,
        name: req.body.name,
        passwordHash: req.body.password //still need to encode this..
    });


    user.save((err, user) => {

        if(err) {
            //Logging..
            res.status(500).send('Error occured');
        }

        //Generate token

        res.status(201).send({
            token: 'token here'
        });
    })


    //First would need to check if this email is already registered...





 

});



module.exports = router;
