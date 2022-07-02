const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
require('dotenv').config();


const app = express();

const corsOption ={
    origin: '*',
    allowHeaders: 'Content-Type, Authorization',
    methods: 'GET,  HEAD, PUT, PATCH, POST, DELETE',
    optionsSuccessStatus: '200'
};

app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(mongoSanitize());

mongoose.connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.h2wre.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => console.log('Connection to MongoDB successful'))
    .catch(() => console.log('Connection to MongoDB failed'));

module.exports = app;
