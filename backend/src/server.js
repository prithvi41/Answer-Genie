const express = require("express");
require("dotenv").config();
const app = express();
const cors = require('cors');
const authRouetr = require('../src/routes/authRouetr'); // Corrected import path

const { handleIncomingData } = require('./call-api'); // Ensure you import handleIncomingData

app.use(express.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));

app.use('/', authRouetr); // Mount authRouter at root path

app.post('/submit-form', async (req, res) => {
    try {
        const data = req.body;
        const dietPlan = await handleIncomingData(data); // Ensure handleIncomingData is correctly defined and imported
        res.json({ dietPlan });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 8080; // Use process.env.PORT or default to 8080
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
