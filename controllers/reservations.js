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

exports.modifyReservation = (req, res, next) => {
    const reservation = new Reservations({
        _id: req.body._id,
        id: req.params.id,
        clientName: req.body.clientName,
        vehicle: req.body.vehicle,
        licensePlate: req.body.licensePlate,
        city: req.body.city,
        parking: req.body.parking,
        parkingId: req.body.parkingId,
        checkin: req.body.checkin,
        checkout: req.body.checkout,
    });
    Reservations.updateOne({ _id: req.body._id }, reservation)
        .then(() => res.status(200).json({ message: 'Réservation modifiée !' }))
        .catch((error) => res.status(400).json({ error }));
};

exports.deleteReservation = (req, res) => {
    Reservations.deleteOne({ _id: req.body._id }, { id: req.params.id })
        .then(() =>
            res.status(200).json({ message: 'Reservation supprimée !' })
        )
        .catch((error) => res.status(400).json({ error }));
};
