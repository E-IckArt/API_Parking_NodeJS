// Appel des modules
const express = require('express');
const app = express();
const parkings = require('./parkings.json');
const reservations = require('./reservations.json');
const path = require('path');

// Définition des variables
const host = 'localhost';
const port = 8080;

// Ajout du Middleware pour récupérer les données et et interpréter le body passés dans la requête POST
app.use(express.json());

/*
 * Définition des routes pour la ressource PARKING
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

// Définition de la route POST/parkings (fonctionnement vérifié avec POSTMAN)
app.post('/parkings', (req, res) => {
    parkings.push(req.body);
    res.status(200).json(parkings);
});

// Définition de la route PATCH/parkings/:id pour pouvoir mettre à jour les données d'un parking sans modifier l'intégralité du document (fonctionnement vérifié avec POSTMAN)
app.patch('/parkings/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let parking = parkings.find((parking) => parking.id === id);
    (parking.name = req.body.name),
        (parking.city = req.body.city),
        (parking.type = req.body.type),
        res.status(200).json(parking);
});

// Définition de la route DELETE/parkings/:id (fonctionnement vérifié avec POSTMAN)
app.delete('/parkings/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let parking = parkings.find((parking) => parking.id === id);
    parkings.splice(parkings.indexOf(parking), 1);
    res.status(200).json(parkings);
});

/*
 *
 * Définition des routes pour la ressource RESERVATION
 *
 */

// Définition de la route GET/reservations
app.get('/reservations', (req, res) => {
    res.status(200).json(reservations);
});

// Définition de la route GET/parkings/:id/reservations
app.get('/parkings/:id/reservations', (req, res) => {
    const id = parseInt(req.params.id);
    const reservation = reservations.filter(
        (reservation) => reservation.parkingId === id
    );
    res.status(200).json(reservation);
});

// Ajout du middleware de redirection vers la page index.html
app.use(express.static(path.join(__dirname, 'public')));

// Server setup
app.listen(port, host, () => {
    console.log(`Serveur is running on http://${host}:${port}`);
});
