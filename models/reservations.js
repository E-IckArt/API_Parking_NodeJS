const mongoose = require('mongoose');

// Création du schéma de données
const reservationSchema = mongoose.Schema({
    id: { type: Number, required: true },
    clientName: { type: String, required: true },
    vehicle: { type: String, required: true },
    licensePlate: { type: String, required: true },
    city: { type: String, required: true },
    parking: { type: String, required: true },
    parkingId: { type: Number, required: true },
    checkin: { type: Date, required: true },
    checkout: { type: Date, required: true },
});

// Export du schéma en tant que modèle Mongoose. Le schéma est maintenant disponible dans l'appli Express
module.exports = mongoose.model('Reservations', reservationSchema);
