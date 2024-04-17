const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware para permitir CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Middleware para procesar el cuerpo de la solicitud como JSON
app.use(express.json());

// Ruta para manejar el registro de compras
app.post('/registrar-compra', (req, res) => {
  // Obtener los datos del carrito del cuerpo de la solicitud
  const datosCarrito = req.body;
  
  // Validar que se hayan recibido los datos del carrito
  if (!datosCarrito) {
    res.status(400).send('Datos del carrito no recibidos');
    return;
  }

  // Resto del código para manejar el registro de compras...
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
