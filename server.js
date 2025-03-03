const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const app = express();

// Laad environment variables
dotenv.config();

// Serve statische bestanden
app.use(express.static(__dirname));

// Route voor de API key
app.get('/api/maps-key', (req, res) => {
    res.json({ key: process.env.GOOGLE_MAPS_API_KEY });
});

// Start de server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server draait op http://localhost:${PORT}`);
}); 