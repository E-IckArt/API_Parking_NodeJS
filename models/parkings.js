const mongoose = require('mongoose');

// Création du schéma de données
const parkingSchema = mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    city: { type: String, required: true },
});

// TODO : Créer une boucle sur l'id pour l'auto-implémenter en fonction du nombre de parking existant

// Export du schéma en tant que modèle Mongoose. Le schéma est maintenant disponible dans l'appli Express
module.exports = mongoose.model('Parkings', parkingSchema);
