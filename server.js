const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

// Serve static files vanuit de juiste directory
app.use(express.static(path.join(__dirname)));

// Voeg een route toe voor de hoofdpagina
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Route voor het ophalen van de Google Maps API key
app.get('/api/maps-key', (req, res) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'API key niet gevonden' });
    }
    res.json({ key: apiKey });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server draait op http://localhost:${PORT}`);
}); 