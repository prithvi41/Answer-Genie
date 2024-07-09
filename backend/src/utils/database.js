const { Client } = require('pg');
require('dotenv').config();
const path = require('path');
const fs = require('fs');

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD
});

client.connect((err) => {
    if (err) {
        console.log(err);
        return new Error("Unable to connect to the database");
    }
    const schemaPath = path.join(__dirname, '../models/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf-8');
    client.query(schema, (err) => {
        if (err) {
            console.log(err);
            return new Error("unexpected error");
        }
        console.log("schema created successfully");
    })
});

module.exports = client;