// Ce fichier contient la configuration du serveur Node.js

const http = require('http');
const app = require('./index');

// Définition des variables
const host = 'localhost';

const normalizePort = (val) => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

const port = normalizePort(process.env.PORT || 8080);
app.set('port', port);

const errorHandler = (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind =
        typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const serverAddress = () => {
    const address = server.address();
    const bind =
        typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Server is listening ' + bind);
};
const server = http.createServer(app);

// Server setup

try {
    server.listen(port, host, () => {
        console.log(`Server is running on http://${host}:${port}`);
    });
    server.on('error', errorHandler);
    server.on('listening', serverAddress);
} catch (error) {
    console.error(`Could not run server : ${error}`);
    process.exit(1);
}
