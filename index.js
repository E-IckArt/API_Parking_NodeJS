// Appel des modules
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require('path');
const Parkings = require('./models/Parkings');
const Reservations = require('./models/reservations');
const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

// Database Name
// const dbName = 'parkingApi';

// Connexion à la DB
async function connectToDB() {
    // Use connect method to connect to the server
    await mongoose
        .connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log('Connexion à MongoDB réussie !'))
        .catch((error) => {
            handleError(error);
            console.error('Connexion à MongoDB échouée !');
        });
}
connectToDB();

// Ajout du middleware de redirection vers la page index.html
const url = app.use(express.static(path.join(__dirname, 'public')));

// Ajout du Middleware pour récupérer les données et et interpréter le body passés dans la requête POST
app.use(express.json());

// Pour éviter les problèmes de CORS - Ces headers permettent :
app.use((req, res, next) => {
    // D'accéder à l'API depuis n'importe quelle origine ('*')
    res.setHeader('Access-Control-Allow-Origin', '*');
    // d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    );
    // d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.)
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    );
    next();
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World');
    res.status(200);
});

/*
 * Définition des routes pour la ressource PARKING
 */

// Définition de la route GET/parkings
app.get('/parkings', (req, res, next) => {
    Parkings.find()
        .then((parkings) => res.status(200).json(parkings))
        .catch((error) => res.status(400).json({ error }));
});

// Définition de la route GET/parkings/:id
app.get('/parkings/:id', (req, res) => {
    const idParking = parseInt(req.params.id);
    Parkings.findOne({ id: idParking })
        .then((parking) => res.status(200).json(parking))
        .catch((error) => res.status(404).json({ error }));
});

// Définition de la route POST/parkings (fonctionnement vérifié avec POSTMAN)
app.post('/parkings', (req, res, next) => {
    delete req.body._id;
    const parking = new Parkings({
        ...req.body,
    });
    parking
        .save()
        .then(() => res.status(201).json({ message: `Parking enregistré !` }))
        .catch((error) => res.status(400).json({ error }));
});

// Définition de la route PATCH/parkings/:id pour pouvoir mettre à jour les données d'un parking sans modifier l'intégralité du document (fonctionnement vérifié avec POSTMAN)
app.put('/parkings/:id', (req, res) => {
    const idParking = parseInt(req.params.id);
    Parkings.updateOne({ id: idParking }, { ...req.body })
        .then(() => res.status(200).json({ message: 'Parking modifié !' }))
        .catch((error) => res.status(400).json({ error }));
});

// Définition de la route DELETE/parkings/:id (fonctionnement vérifié avec POSTMAN)
app.delete('/parkings/:id', (req, res) => {
    Parkings.deleteOne({ id: req.params.id })
        .then(() => res.status(200).json({ message: 'Parking supprimé !' }))
        .catch((error) => res.status(400).json({ error }));
});

/*
 *
 * Définition des routes pour la ressource RESERVATION
 *
 */

// Définition de la route GET/reservations
app.get('/reservations', (req, res) => {
    Reservations.find()
        .then((reservations) => res.status(200).json(reservations))
        .catch((error) => res.status(400).json({ error }));
});

// Définition de la route GET/reservations/:idReservation
app.get('/reservations/:idReservation', (req, res) => {
    const idReservation = parseInt(req.params.idReservation);
    Reservations.findOne({ id: idReservation })
        .then((reservation) => res.status(200).json(reservation))
        .catch((error) => res.status(404).json({ error }));
});

// Définition de la route GET/parkings/:id/reservations
app.get('/parkings/:id/reservations', (req, res) => {
    const idParking = parseInt(req.params.id);
    Reservations.find()
        .where({ parkingId: idParking })
        .then((reservations) => res.status(200).json(reservations))
        .catch((error) => res.status(404).json({ error }));
});

// Définition de la route GET/parkings/:id/reservations/:idReservation
app.get('/parkings/:id/reservations/:idReservation', (req, res) => {
    const idParking = parseInt(req.params.id);
    const idReservation = parseInt(req.params.idReservation);
    Reservations.findOne({ parkingId: idParking } && { id: idReservation })
        .then((reservation) => res.status(200).json(reservation))
        .catch((error) => res.status(404).json({ error }));
});

// Définition de la route POST/reservations
// TODO - Trouver comment vérifier si le parking réservé existe
app.post('/reservations', (req, res) => {
    const reservation = new Reservations({
        ...req.body,
    });
    reservation
        .save()
        .then(() =>
            res.status(201).json({ message: `Réservation enregistrée !` })
        )
        .catch((error) => res.status(400).json({ error }));
});

// Définition de la route POST/parkings/:id/reservations
app.post('/parkings/:id/reservations', (req, res) => {
    const reservation = new Reservations({
        ...req.body,
        parkingId: req.params.id,
        parking: `Parking ${req.params.id}`,
    });
    reservation
        .save()
        .then(() =>
            res.status(201).json({ message: `Réservation enregistrée !` })
        )
        .catch((error) => res.status(400).json({ error }));
});

// Définition de la route PUT/parkings/:id/reservations/:idReservation (modification sur le même parking)
app.put('/parkings/:id/reservations/:idReservation', (req, res) => {
    const idReservation = parseInt(req.params.idReservation);
    Reservations.updateOne({
        ...req.body,
        id: idReservation,
        parkingId: req.params.id,
        parking: `Parking ${req.params.id}`,
    })
        .then(() => res.status(200).json({ message: 'Réservation modifiée !' }))
        .catch((error) => res.status(404).json({ error }));
});

// Définition de la route PUT/reservations/:idReservation (pour pouvoir transférer reservation vers un autre parking lors de la modification)
app.put('/reservations/:idReservation', (req, res) => {
    const idReservation = parseInt(req.params.idReservation);
    Reservations.updateOne({
        ...req.body,
        id: idReservation,
    })
        .then(() => res.status(200).json({ message: 'Réservation modifiée !' }))
        .catch((error) => res.status(404).json({ error }));
});

// Définition de la route DELETE/parkings/:id/reservations/:idReservation
app.delete('/parkings/:id/reservations/:idReservation', (req, res) => {
    const idParking = parseInt(req.params.id);
    const idReservation = parseInt(req.params.idReservation);
    if (req.body.parkingId !== idParking || req.body.id !== idReservation) {
        console.error(
            "La suppression de cette réservation n'est pas autorisée. "
        );
    } else {
        Reservations.deleteOne({ id: req.params.id })
            .then(() =>
                res.status(200).json({ message: 'Réservation supprimée !' })
            )
            .catch((error) => res.status(400).json({ error }));
    }
});

// Définition de la route DELETE/reservations/:idReservation
app.delete('/reservations/:idReservation', (req, res) => {
    const idReservation = parseInt(req.params.idReservation);
    if (req.body.id !== idReservation) {
        res.status(200).json({ message: 'Suppression non autorisée !' });
    } else {
        Reservations.deleteOne({ id: req.params.id })
            .then(() =>
                res.status(200).json({ message: 'Réservation supprimée !' })
            )
            .catch((error) => res.status(400).json({ error }));
    }
});

module.exports = app;
