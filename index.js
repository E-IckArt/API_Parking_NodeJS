const express = require('express');
const parkings = require('./parkings.json');
const app = express();

const host = 'localhost';
const port = 8080;
const path = require('path');

/*
 * Définition des routes
 */

// Définition de la route GET/parkings
app.get('/parkings', (req, res) => {
    res.status(200).json(parkings);
});

// Définition de la route GET/parkings/:id
app.get('/parkings/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const parking = parkings.find((parking) => parking.id === id);
    res.status(200).json(parking);
});

// Redirection vers la page index.html
app.use(express.static(path.join(__dirname, 'public')));

// Server setup
app.listen(port, host, () => {
    console.log(`Serveur is running on http://${host}:${port}`);
});
