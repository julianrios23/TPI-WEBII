const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware para permitir CORS
app.use(cors({
  origin: 'http://localhost:3000', // Cambia esto al origen correcto de tu solicitud
  credentials: true // Habilita el envío de cookies en la solicitud (si es necesario)
}));

// Middleware para parsear JSON en las solicitudes POST
app.use(bodyParser.json());

// Define tus rutas y lógica de manejo aquí...

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
