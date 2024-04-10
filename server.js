const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Define la ruta para servir el archivo JSON
app.get('D:/Tecnicatura/Web II/Integrador Julian Rios/eCommerce/datos.json', (req, res) => {
  // Lee el archivo JSON local
  fs.readFile('datos.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo JSON:', err);
      res.status(500).send('Error interno del servidor');
      return;
    }

    // Convierte el contenido del archivo a objeto JSON
    const jsonData = JSON.parse(data);
    // Envia el JSON como respuesta
    res.json(jsonData);
  });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
