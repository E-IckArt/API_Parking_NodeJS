// Création du routeur Express
const express = require('express');
const router = express.Router();

// Appel du schema des parkings
const Parkings = require('../models/parkings');

/*
 * Définition des routes pour la ressource PARKING
 */

// Définition de la route GET/parkings
router.get('/', (req, res, next) => {
    Parkings.find()
        .then((parkings) => res.status(200).json(parkings))
        .catch((error) => res.status(400).json({ error }));
});

// Définition de la route GET/parkings/:id
router.get('/:id', (req, res, next) => {
    const idParking = parseInt(req.params.id);
    Parkings.findOne({ id: idParking })
        .then((parking) => res.status(200).json(parking))
        .catch((error) => res.status(404).json({ error }));
});

// Définition de la route POST/parkings
router.post('/', (req, res, next) => {
    delete req.body._id;
    const parking = new Parkings({
        ...req.body,
    });
    parking
        .save()
        .then(() => res.status(201).json({ message: `Parking enregistré !` }))
        .catch((error) => res.status(400).json({ error }));
});

// Définition de la route PUT/parkings/:id
router.put('/:id', (req, res, next) => {
    const idParking = parseInt(req.params.id);
    Parkings.updateOne({ id: idParking }, { ...req.body })
        .then(() => res.status(200).json({ message: 'Parking modifié !' }))
        .catch((error) => res.status(400).json({ error }));
});

// Définition de la route DELETE/parkings/:id (
router.delete('/:id', (req, res, next) => {
    Parkings.deleteOne({ id: req.params.id })
        .then(() => res.status(200).json({ message: 'Parking supprimé !' }))
        .catch((error) => res.status(400).json({ error }));
});

// Export du routeur
module.exports = router;
