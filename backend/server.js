require('dotenv').config(); 
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const dotenv =require("dotenv");
const connectDatabase = require('./database/database');
const mysql = require('mysql2');
const mysqlConnection  = require('./database/sqlDatabase');
const bodyParser = require('body-parser');
const cors = require("cors");
dotenv.config();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());
app.use(cors());

const Routes = require("./routes/sqlroutes");
connectDatabase();


app.use('/api',Routes);


app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});