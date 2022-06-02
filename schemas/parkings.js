import mongoose from 'mongoose';
const { schema } = mongoose;
const parkingSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    city: { type: String, required: true },
});

module.exports = mongoose.model('parkings', parkingSchema);
