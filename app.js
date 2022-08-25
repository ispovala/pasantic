var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var usersRouter = require('./routes/users.routes');
var enterprisesRouter = require('./routes/enterprises.routes');
var studentsRouter = require('./routes/student.routes');
var internshipsRouter = require('./routes/internship.routes');
var intershipStudentRouter = require('./routes/internshipStudent.routes');
var loginRouter = require('./routes/login.routes');

//var connection = require('./helpers/connection');

var app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/enterprises',enterprisesRouter);
app.use('/students',studentsRouter);
app.use('/internships',internshipsRouter);
app.use('/internshipStudent',intershipStudentRouter);
app.use('/login',loginRouter);


app.use((err, req, res, next) => {
    res.status(500).json({ message: err.message });
});  


module.exports = app;
