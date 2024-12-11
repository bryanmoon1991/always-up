const axios = require('axios');

const url = 'https://nokcha.me';
const interval = 3600000; // 1 hour in milliseconds
const requestTimeout = 90000; // 1.5 minutes in milliseconds

const pingUrl = async () => {
    try {
        const response = await axios.get(url, { timeout: requestTimeout });
        console.log(`Pinged ${url}: ${response.status}`);
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            console.error(`Ping timed out after ${requestTimeout} ms`);
        } else {
            console.error(`Failed to ping ${url}:`, error.message);
        }
    }
};

setInterval(pingUrl, interval);