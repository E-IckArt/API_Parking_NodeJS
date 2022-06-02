import mongoose from 'mongoose';
const { schema } = mongoose;
const reservationSchema = new Schema({
    id: { type: Number, required: true },
    parking: { type: String, required: true },
    parkingId: { type: Number, required: true },
    city: { type: String, required: true },
    clientName: { type: String, required: true },
    licensePlate: { type: String, required: true },
    checkin: { type: Date, required: true },
    checkout: { type: Date, required: true },
});

module.exports = mongoose.model('reservations', reservationSchema);
