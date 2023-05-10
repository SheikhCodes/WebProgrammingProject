const express = require('express');
const { config } = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
const AppError = require('./utils/appError');
const cors = require('cors');
const expressfileupload = require('express-fileupload');
config();
require('./db')
const app = express();

app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(expressfileupload());

const adminRouter = require('./routes/admin.router');
const learnerRouter = require('./routes/learner.routes');
const errorHandler = require('./handler/errorHandler');

app.use(adminRouter);
app.use(learnerRouter);
app.all('*', (req, res, next) => {
    next(new AppError(`can not find route ${req.originalUrl} on this server`, 404));
})

app.use(errorHandler);

module.exports = app;