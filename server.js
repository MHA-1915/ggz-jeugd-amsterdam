const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname)));

// Route voor het ophalen van de Google Maps API key
app.get('/api/maps-key', (req, res) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'API key niet gevonden' });
    }
    res.json({ key: apiKey });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server draait op http://localhost:${PORT}`);
}); 