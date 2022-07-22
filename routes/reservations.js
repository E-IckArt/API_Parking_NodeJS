// Création du routeur Express
const express = require('express');
const router = express.Router();

// Appel du contrôleur des reservations
const reservationsCtrl = require('../controllers/reservations');

// Définition de la route GET/reservations
router.get('/', reservationsCtrl.getAllReservations);

// Définition de la route GET/reservations/:idReservation
router.get('/:idReservation', reservationsCtrl.getOneReservation);

// Définition de la route POST/reservations
router.post('/', reservationsCtrl.createReservation);

// Définition de la route PUT/reservations/:idReservation (pour pouvoir transférer reservation vers un autre parking lors de la modification)
router.put('/:idReservation', reservationsCtrl.modifyReservation);

// Définition de la route DELETE/reservations/:idReservation
router.delete('/:idReservation', reservationsCtrl.deleteReservation);

module.exports = router;
