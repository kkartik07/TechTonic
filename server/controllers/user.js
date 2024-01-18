var jwt = require('jsonwebtoken');
const User=require('../models/User');
require('dotenv').config();

const SECRET=process.env.SECRET;

async function createAccount(req, res) {
    const userBody = req.body;
    const user = new User(userBody);
    await user.save();
    const token = jwt.sign({username:user.username,userId: user._id}, SECRET);
    res.json({ token });
}

async function login(req, res) {
    const userBody = req.body;
    const user = await User.findOne({ username: userBody.username });

    if (!user || user.length === 0 || user.password !== userBody.password) {
        res.send('User not found or incorrect username/password');
    } else {

    const token = jwt.sign({ username:user.username,userId: user._id }, SECRET);
        res.json({ token });
    }
}

module.exports={createAccount, login}