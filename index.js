const express = require('express');
const app = express();

const host = 'localhost';
const port = 8080;

// Server setup
app.listen(port, host, () => {
    console.log(`Serveur is running on http://${host}:${port}`);
});
