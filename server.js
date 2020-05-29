const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');

const path = require('path');

// Sets port if deploying to external provider 
// or port assigned already
const port = process.env.port || 5000;

const app = express();

//Connect the database 
connectDB();

// Middlewear on all routes 
app.use(cors());
app.use(express.json({ extended: false }));
app.use(express.static('public'));

// pug templating
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));
// Define Routes
app.use('/api/', require('./routes/api'))
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/subscription', require('./routes/api/subscription'));

// Listen
app.listen(port, () => console.log(`Ready to wide on bum ${port}`));