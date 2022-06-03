import mongoose from 'mongoose';
const { Schema } = mongoose;

// Création du schéma de données
const parkingSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    city: { type: String, required: true },
});

// Export du schéma en tant que modèle Mongoose. Le schéma est maintenant disponible dans l'appli Express
module.exports = mongoose.model('parkings', parkingSchema);
