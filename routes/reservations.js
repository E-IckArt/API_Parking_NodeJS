// Création du routeur Express
const express = require('express');
const router = express.Router();

// Appel du schema des parkings
const Reservations = require('../models/reservations');
/*
 *
 * Définition des routes pour la ressource RESERVATION
 *
 */

// Définition de la route GET/reservations
router.get('/', (req, res) => {
    Reservations.find()
        .then((reservations) => res.status(200).json(reservations))
        .catch((error) => res.status(400).json({ error }));
});

// Définition de la route GET/reservations/:idReservation
router.get('/:idReservation', (req, res) => {
    const idReservation = parseInt(req.params.idReservation);
    Reservations.findOne({ id: idReservation })
        .then((reservation) => res.status(200).json(reservation))
        .catch((error) => res.status(404).json({ error }));
});

// Définition de la route GET/parkings/:id/reservations
router.get('/', (req, res) => {
    const idParking = parseInt(req.params.id);
    Reservations.find()
        .where({ parkingId: idParking })
        .then((reservations) => res.status(200).json(reservations))
        .catch((error) => res.status(404).json({ error }));
});

// Définition de la route GET/parkings/:id/reservations/:idReservation
router.get('/:idReservation', (req, res) => {
    const idParking = parseInt(req.params.id);
    const idReservation = parseInt(req.params.idReservation);
    Reservations.findOne({ parkingId: idParking } && { id: idReservation })
        .then((reservation) => res.status(200).json(reservation))
        .catch((error) => res.status(404).json({ error }));
});

// Définition de la route POST/reservations
// TODO - Trouver comment vérifier si le parking réservé existe
router.post('/', (req, res) => {
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
router.post('/', (req, res) => {
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
router.put('/:idReservation', (req, res) => {
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
router.put('/:idReservation', (req, res) => {
    const idReservation = parseInt(req.params.idReservation);
    Reservations.updateOne({
        ...req.body,
        id: idReservation,
    })
        .then(() => res.status(200).json({ message: 'Réservation modifiée !' }))
        .catch((error) => res.status(404).json({ error }));
});

// Définition de la route DELETE/parkings/:id/reservations/:idReservation
router.delete('/:idReservation', (req, res) => {
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
router.delete('/:idReservation', (req, res) => {
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

module.exports = router;