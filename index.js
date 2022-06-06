// Appel des modules
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require('path');

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

const parkingsRoutes = require('./routes/parkings');
const reservationsRoutes = require('./routes/reservations');

// Connexion à la DB
async function connectToDB() {
    // Use connect method to connect to the server
    await mongoose
        .connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log('Connexion à MongoDB réussie !'))
        .catch((error) => {
            handleError(error);
            console.error('Connexion à MongoDB échouée !');
        });
}
connectToDB();

// Ajout du middleware de redirection vers la page index.html
const url = app.use(express.static(path.join(__dirname, 'public')));

// Ajout du Middleware pour récupérer les données et interpréter le body passé dans la requête POST
app.use(express.json());

// Pour éviter les problèmes de CORS - Ces headers permettent :
app.use((req, res, next) => {
    // d'accéder à l'API depuis n'importe quelle origine ('*')
    res.setHeader('Access-Control-Allow-Origin', '*');
    // d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    );
    // d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.)
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    );
    next();
});

// Ajout du middleware pour prévenir le système que la réponse est attendue au format json
app.use(bodyParser.json());

app.use('/parkings', parkingsRoutes);
app.use('/parkings/:id/reservations', reservationsRoutes);
app.use('/reservations', reservationsRoutes);

module.exports = app;
