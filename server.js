const express = require('express');
const app = express();
const path = require('path');

// Middleware para configurar los encabezados CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Permitir solicitudes desde cualquier origen
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // Permitir métodos específicos
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Permitir ciertos encabezados
    next();
});

// Ruta para servir el archivo ofertas.json
app.get('/ofertas.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'ofertas.json'));
});

// Escucha en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});
