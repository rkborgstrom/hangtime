'use strict';

const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('./knexfile.js')['development'];
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const knex = require('knex')(config);
// const bcryptjs = require('bcryptjs');
const morgan = require('morgan');
// const moment = require('moment');
const index = require('./routes/index');
const account = require('./routes/account');
const login = require('./routes/login');
const post = require('./routes/post');
const profile = require('./routes/profile');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.disable('x-powered-by');
app.use(morgan('short'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res, next) => {
    res.render('index', {user_report: []});
})

app.use('/index', index);
app.use(account);
app.use(login);
app.use(post);
app.use(profile);

app.use((_req, res) => {
    res.sendStatus(404);
});

app.listen(port, function () {
    console.log('Listening on port', port);
});

module.exports = app;
