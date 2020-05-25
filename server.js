const express = require("express");
const cors = require("cors");

// Sets port if deploying to external provider 
// or port assigned already
const port = process.env.port || 5000;

// Equivalent of create server in http library
const app = express();

// Call the middleware we want to use
app.use(cors());
app.use(express.json());

// Routes
app.get("/",(req,res) => {
    res.send("Up and wiping")
});

// Listen
app.listen(port, () => console.log(`Ready to wide on bum ${port}`));