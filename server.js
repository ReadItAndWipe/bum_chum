const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require("connect-mongo")(session);
const passport = require('passport');

const path = require('path');

// Sets port if deploying to external provider 
// or port assigned already
const port = process.env.PORT || 5000;

const app = express();

//Connect the database 
connectDB();
console.log(process.env.NODE_ENV);
console.log(process.env.MONGODB_URI);

// Middleware on all routes 
app.use(cors());
app.use(express.json({ extended: false }));

app.use(session({
    // resave and saveUninitialized set to false for deprecation warnings
    secret: "ubsw89iNjxPenHBUdPGvU2xq",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1800000
    },
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    })
}));

require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));

// pug templating
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));
// Define Routes
app.use('/', require('./routes'))
app.use('/users', require('./routes/users'));
app.use('/login', require('./routes/login-passport'));
app.use('/order', require('./routes/order'));
app.use('/myorders', require('./routes/myorders'));
app.use('/about', require('./routes/about'))

// Listen
app.listen(port, () => console.log(`Ready to wipe on bum ${port}`));