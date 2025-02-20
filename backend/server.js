require('dotenv').config(); 
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const dotenv =require("dotenv");
const connectDatabase = require('../database');
dotenv.config();
app.use(express.json());

const Routes = require("../routes")
connectDatabase();

app.use('/api',Routes);


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});