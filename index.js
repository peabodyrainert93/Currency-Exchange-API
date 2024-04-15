require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const API_KEY = process.env.EXCHANGE_RATE_API_KEY;
const BASE_URL = 'https://v6.exchangerate-api.com/v6/';

app.get('/api/rates', async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}${API_KEY}/latest/USD`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching the exchange rates', error: error.message });
    }
});

app.get('/api/convert', async (req, res) => {
    const { from, to, amount } = req.query;
    try {
        const response = await axios.get(`${BASE_URL}${API_KEY}/pair/${from}/${to}/${amount}`);
        res.status(200).json({
            from,
            to,
            amount,
            conversion_result: response.data.conversion_result,
            conversion_rate: response.data.conversion_rate
        });
    } catch (error) {
        res.status(500).json({ message: 'Error converting the currency', error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Currency Exchange API server running on http://localhost:${port}`);
});
