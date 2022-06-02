const express = require('express');
const app = express();

const host = 'localhost';
const port = 8080;
const path = require('path');

// Redirection vers la page index.html
app.use(express.static(path.join(__dirname, 'public')));

// Server setup
app.listen(port, host, () => {
    console.log(`Serveur is running on http://${host}:${port}`);
});
