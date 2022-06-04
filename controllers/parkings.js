// Appel du schema des parkings
const Parkings = require('../models/parkings');

/* Logique des fonctions pour les opérations CRUD sur les parkings*/

exports.getAllParkings = (req, res, next) => {
    Parkings.find()
        .then((parkings) => res.status(200).json(parkings))
        .catch((error) => res.status(400).json({ error }));
};

exports.getOneParking = (req, res, next) => {
    const idParking = parseInt(req.params.id);
    Parkings.findOne({ id: idParking })
        .then((parking) => res.status(200).json(parking))
        .catch((error) => res.status(404).json({ error }));
};

exports.createParking = (req, res, next) => {
    delete req.body._id;
    const parking = new Parkings({
        ...req.body,
    });
    parking
        .save()
        .then(() => res.status(201).json({ message: `Parking enregistré !` }))
        .catch((error) => res.status(400).json({ error }));
};

exports.modifyParking = (req, res, next) => {
    const parking = new Parkings({
        ...req.body,
    });
    Parkings.updateOne({ id: req.params.id }, parking)
        .then(() => res.status(200).json({ message: 'Parking modifié !' }))
        .catch((error) => res.status(400).json({ error }));
};

exports.deleteParking = (req, res, next) => {
    Parkings.deleteOne({ id: req.params.id })
        .then(() => res.status(200).json({ message: 'Parking supprimé !' }))
        .catch((error) => res.status(400).json({ error }));
};
