const axios = require('axios');
const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const url = 'https://nokcha.me';
const interval = 3600000; // 1 hour in milliseconds
const requestTimeout = 90000; // 1.5 minutes in milliseconds

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const pingUrl = async () => {
	console.log('starting interval...');
    try {
        const response = await axios.get(url, { timeout: requestTimeout });
        console.log(`Pinged ${url}:`, response.status);
		console.log('result', response.data)
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            console.error(`Ping timed out after ${requestTimeout} ms`);
        } else {
            console.error(`Failed to ping ${url}:`, error.message);
        }
    }
};

setInterval(pingUrl, interval);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});