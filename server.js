const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db")

// Sets port if deploying to external provider 
// or port assigned already
const port = process.env.port || 5000;

const app = express();

//Connect the database 
connectDB();

// Middlewear on all routes 
app.use(cors());
app.use(express.json());

// Routes
app.get("/",(req,res) => {
    res.send("Up and wiping")
});

// Listen
app.listen(port, () => console.log(`Ready to wide on bum ${port}`));