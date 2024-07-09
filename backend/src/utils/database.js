const { Client } = require('pg');
require('dotenv').config();
const path = require('path');
const fs = require('fs');

var conString = process.env.API 
var client = new Client(conString);

client.connect((err) => {
    if (err) {
        console.log(err);
    } 
    else {
        console.log("Database connected");
    }
}
);

module.exports = client;