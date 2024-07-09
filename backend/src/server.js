const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());

app.listen(process.env.PORT, (req, res) => {
    console.log(`server running on port ${process.env.PORT}`);
})