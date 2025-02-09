require('dotenv').config(); 
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const dotenv =require("dotenv");
const connectDatabase = require('./database');
dotenv.config();

connectDatabase();
app.get('/', (req, res) => {
    const dbStatus = mongoose.connection.readyState === 1? "Database Connected Successfully" : "Database Connection Failed";
    res.json({ status: dbStatus});
});


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});