'use strict';
require('dotenv').config();
const { createClient } = require('redis');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use(express.urlencoded({ extended: true }));

const client = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_URL,
        port: process.env.REDIS_URL_PORT
    }
});
client.connect();
client.on('connect', () => {
    console.log('Redis client connected');
});
client.on('error', (err) => {
    console.log('Something went wrong ' + err);
});

app.use((req, res, next) => {
    req.cache = client;
    next();
});

const routes = require('./routes');

app.use('/api/dynamic', routes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('running on port', PORT);
});

