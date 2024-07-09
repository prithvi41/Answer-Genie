const express = require("express");
require("dotenv").config();
const app = express();
const cors = require('cors')
app.use(express.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));
const authRouter = require('../src/routes/authRouetr');

app.use('/', authRouter);

app.listen(process.env.PORT, (req, res) => {
    console.log(`server running on port ${process.env.PORT}`);
})