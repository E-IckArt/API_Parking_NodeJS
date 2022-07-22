// Création du routeur Express
const express = require('express');
const router = express.Router();

// Appel du contrôleur des parkings
const parkingsCtrl = require('../controllers/parkings');

// Définition de la route GET/parkings
router.get('/', parkingsCtrl.getAllParkings);

// Définition de la route GET/parkings/:id
router.get('/:id', parkingsCtrl.getOneParking);

// Définition de la route POST/parkings
router.post('/', parkingsCtrl.createParking);

// Définition de la route PUT/parkings/:id
router.put('/:id', parkingsCtrl.modifyParking);

// Définition de la route DELETE/parkings/:id
router.delete('/:id', parkingsCtrl.deleteParking);

// Export du routeur
module.exports = router;
