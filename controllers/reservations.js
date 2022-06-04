// Appel du schema des parkings
const Reservations = require('../models/reservations');

/* Logique des fonctions pour les opérations CRUD sur les reservations*/

exports.getAllReservations = (req, res) => {
    Reservations.find()
        .then((reservations) => res.status(200).json(reservations))
        .catch((error) => res.status(400).json({ error }));
};

exports.getOneReservation = (req, res) => {
    const idReservation = parseInt(req.params.idReservation);
    Reservations.findOne({ id: idReservation })
        .then((reservation) => res.status(200).json(reservation))
        .catch((error) => res.status(404).json({ error }));
};

// TODO - Trouver comment vérifier si le parking réservé existe
exports.createReservation = (req, res) => {
    const reservation = new Reservations({
        ...req.body,
    });
    reservation
        .save()
        .then(() =>
            res.status(201).json({ message: `Réservation enregistrée !` })
        )
        .catch((error) => res.status(400).json({ error }));
};

exports.modifyReservation = (req, res) => {
    const idReservation = parseInt(req.params.idReservation);
    Reservations.updateOne({
        ...req.body,
        id: idReservation,
    })
        .then(() => res.status(200).json({ message: 'Réservation modifiée !' }))
        .catch((error) => res.status(404).json({ error }));
};

exports.deleteReservation = (req, res) => {
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
};
