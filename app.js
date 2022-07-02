const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const userRouter = require('./router/user')
const cors = require('cors');
const path = require('path')
require('dotenv').config();

const app = express();

const corsOption ={
    origin: '*',
    allowHeaders: 'Content-Type, Authorization',
    methods: 'GET,  HEAD, PUT, PATCH, POST, DELETE',
    optionsSuccessStatus: '200'
};

mongoose.connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.h2wre.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => console.log('Connection to MongoDB successful'))
    .catch(() => console.log('Connection to MongoDB failed'));

app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(mongoSanitize());
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/user', userRouter);

module.exports = app;
