const path = require('path');
const express = require('express');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'ejs'));

app.use(express.static(path.join(__dirname, './public')));
app.use(helmet());

app.use('/api', limiter);

// if the file is greater then 10kb then i will not be accepted
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

module.exports = app;