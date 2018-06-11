const express = require('express');
const User = require('../model/User');

const router = express.Router();

router.get('/api/profile', async (req, res) => {
    let user = await User.findOne({ _id: req.user._id }).exec()
    res.status(200).send({
        email: user.email,
        name: user.name
    });
});

module.exports = router;