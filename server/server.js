require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// CORS configuratie - pas dit aan voor productie
app.use(cors({
    origin: ['http://localhost:8000', 'http://localhost:8080'] // Sta beide poorten toe
}));

// Route voor het ophalen van de API key
app.get('/api/maps-key', (req, res) => {
    res.json({ key: process.env.GOOGLE_MAPS_API_KEY });
});

app.listen(port, () => {
    console.log(`Server draait op http://localhost:${port}`);
}); 