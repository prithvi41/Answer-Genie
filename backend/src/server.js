const express = require("express");
require("dotenv").config();
const app = express();
const db = require("./utils/database");
app.use(express.json());
const authRouter = require('../src/routes/authRouetr');

app.use('/', authRouter);
app.listen(process.env.PORT, (req, res) => {
    console.log(`server running on port ${process.env.PORT}`);
})