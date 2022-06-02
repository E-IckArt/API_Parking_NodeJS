// Appel des modules
const express = require('express');
const app = express();
const parkings = require('./parkings.json');
const reservations = require('./reservations.json');
const path = require('path');

// Import du module dotenv
const dotenv = require('dotenv');
dotenv.config();
// const { default: mongoose } = require('mongoose');

// Import du module mongoose et connexion à la DB
// const mongoose = require('mongoose');
// mongoose
//     .connect(process.env.MONGO_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     })
//     .then(() => console.log('Connexion à MongoDB réussie !'))
//     .catch(() => console.log('Connexion à MongoDB échouée !'));

// Import du module mongoose et connexion à la DB
const mongoose = require('mongoose');
// Database Name
const dbName = 'parkingApi';

async function main() {
    // Use connect method to connect to the server
    await mongoose
        .connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log('Connexion à MongoDB réussie !'))
        .catch(() => console.error('Connexion à MongoDB échouée !'));

    // const db = client.db(dbName);
}
main();
// .finally(() => mongoose.close());

// Ajout du middleware de redirection vers la page index.html
const url = app.use(express.static(path.join(__dirname, 'public')));

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

// Définition de la route GET/reservations/:idReservation
app.get('/reservations/:idReservation', (req, res) => {
    const idReservation = parseInt(req.params.idReservation);
    const reservation = reservations.find(
        (reservation) => reservation.id === idReservation
    );
    res.status(200).json(reservation);
});

// Définition de la route GET/parkings/:id/reservations
app.get('/parkings/:id/reservations', (req, res) => {
    const id = parseInt(req.params.id);
    const reservation = reservations.filter(
        (reservation) => reservation.parkingId === id
    );
    res.status(200).json(reservation);
});

// Définition de la route GET/parkings/:id/reservations/:idReservation
app.get('/parkings/:id/reservations/:idReservation', (req, res) => {
    const id = parseInt(req.params.id);
    const idReservation = parseInt(req.params.idReservation);
    const reservation = reservations.find(
        (reservation) =>
            reservation.parkingId === id && reservation.id === idReservation
    );
    res.status(200).json(reservation);
});

// Définition de la route POST/parkings/:id/reservations
app.post('/parkings/:id/reservations', (req, res) => {
    //Vérifie si le parking existe
    if (req.body.parkingId > parkings.length) {
        console.error(`Le parking ${req.body.parkingId} n'existe pas.`);
    } else {
        reservations.push(req.body);
    }
    res.status(200).json(reservations);
});

// Définition de la route PUT/parkings/:id/reservations/:idReservation (modification sur le même parking)
app.put('/parkings/:id/reservations/:idReservation', (req, res) => {
    const idParking = parseInt(req.params.id);
    const idReservation = parseInt(req.params.idReservation);
    const reservation = reservations.find(
        (reservation) =>
            reservation.parkingId === idParking &&
            reservation.id === idReservation
    );
    (reservation.parking = `Parking ${idParking}`),
        (reservation.parkingId = idParking),
        (reservation.city = req.body.city),
        (reservation.clientName = req.body.clientName),
        (reservation.vehicle = req.body.vehicle),
        (reservation.licensePlate = req.body.licensePlate),
        (reservation.checkin = req.body.checkin),
        (reservation.checkout = req.body.checkout),
        res.status(200).json(reservation);
});

// Définition de la route PUT/reservations/:idReservation (pour pouvoir transférer reservation vers un autre parking lors de la modification)
app.put('/reservations/:idReservation', (req, res) => {
    const idReservation = parseInt(req.params.idReservation);
    const reservation = reservations.find(
        (reservation) => reservation.id === idReservation
    );
    (reservation.parking = req.body.parking),
        (reservation.parkingId = req.body.parkingId),
        (reservation.city = req.body.city),
        (reservation.clientName = req.body.clientName),
        (reservation.vehicle = req.body.vehicle),
        (reservation.licensePlate = req.body.licensePlate),
        (reservation.checkin = req.body.checkin),
        (reservation.checkout = req.body.checkout),
        res.status(200).json(reservation);
});

// Définition de la route DELETE/parkings/:id/reservations/:idReservation
app.delete('/parkings/:id/reservations/:idReservation', (req, res) => {
    const idParking = parseInt(req.params.id);
    const idReservation = parseInt(req.params.idReservation);
    const reservation = reservations.find(
        (reservation) =>
            reservation.parkingId === idParking &&
            reservation.id === idReservation
    );
    if (
        reservation.parkingId !== idParking &&
        reservation.id !== idReservation
    ) {
        console.error('Suppression non autorisée');
    } else {
        reservations.splice(reservations.indexOf(reservation), 1);
    }
    res.status(200).json(reservations);
});

// Définition de la route DELETE/reservations/:idReservation
app.delete('/reservations/:idReservation', (req, res) => {
    const idReservation = parseInt(req.params.idReservation);
    const reservation = reservations.find(
        (reservation) => reservation.id === idReservation
    );
    reservations.splice(reservations.indexOf(reservation), 1);
    res.status(200).json(reservations);
});

module.exports = app;
