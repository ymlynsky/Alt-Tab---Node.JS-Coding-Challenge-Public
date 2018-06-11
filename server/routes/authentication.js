const express = require('express');
const { hash, compare, generateJwt } = require('../service/authentication');
const User = require('../model/User');

const router = express.Router();

router.post('/api/register', async (req, res) => {

    //Check if this email is already registered
    let email = req.body.email ? req.body.email.toLowerCase() : "";
    let existingUser = await User.findOne({ email: email }).exec()
    if(existingUser)
        return res.status(400).send({
            email: { message: `User with email '${email}' already exists` }
        });

    //Generate password hash
    let password = req.body.password;
    let passwordHash = password ? await hash(password) : "";

    let user = new User({
        email: email,
        name: req.body.name,
        passwordHash: passwordHash
    });

    //Insert user
    user.save((err, userOut) => {

        if(err) {
            if(err.errors)
                return res.status(400).send(err.errors);
            return res.status(500).send('Server Error');
        }

        res.status(201).send({
            token: generateJwt(userOut)
        });
    })

});


router.post('/api/login', async (req, res) => {

    let user = await User.findOne({ email: req.body.email.toLowerCase() }).exec()
    if(!user)
        return res.status(401).send();

    let password = req.body.password;
    let isPasswordValid = await compare(password, user.passwordHash);

    if(!isPasswordValid)
        return res.status(401).send();

    res.status(200).send({
        token: generateJwt(user)
    });

});

module.exports = router;
