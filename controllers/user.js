const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
require('dotenv').config();

exports.signup = async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).json({
            userId: user._id,
            nickname: user.nickname,
            email: user.email,
            token: jwt.sign(
                {
                    userId: user._id,
                    email: user.email
                },
                process.env.JWT_SECRET,
                { expiresIn: 60 * 60 * 24 }
            ),
        });
    } catch (e) {
        res.status(400).send(e)
    }
};

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if ( !user ) {
            throw new Error('Erreur de connexion')
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if ( !isMatch) {
            throw new Error('Erreur de connexion')
        }
        res.status(200).json({
            userId: user._id,
            nickname: user.nickname,
            email: user.email,
            token: jwt.sign(
                { userId: user._id, email: user.email },
                process.env.JWT_SECRET,
                {
                    expiresIn: 60 * 60 * 24,
                }
            ),
        });
    } catch (e) {
        res.status(400).send(e)
    }
}
