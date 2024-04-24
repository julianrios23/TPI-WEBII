const express = require('express');
const app = express();
const path = require('path');
const translate = require('node-google-translate-skidz');
const axios = require('axios'); // Agrega axios para hacer solicitudes HTTP
const port = 3000; // Cambia el puerto a 3000

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

async function dynamicTranslate(textToTranslate) {
    const translation = await translate({
        text: `${textToTranslate}`,
        source: 'en',
        target: 'es'
    });
    return translation.translation;
}

// Endpoint para obtener productos traducidos desde la API
app.get('/productos-traducidos', async (req, res) => {
    const apiUrl = 'https://fakestoreapi.com/products';

    try {
        const response = await axios.get(apiUrl);

        if (response.status !== 200) {
            throw new Error('La solicitud a la API falló.');
        }

        const productos = response.data;

        // Traducir títulos y descripciones al español
        for (let producto of productos) {
            // Traduce el título
            producto.title = await dynamicTranslate(producto.title);

            // Traduce la descripción (si existe)
            if (producto.description) {
                producto.description = await dynamicTranslate(producto.description);
            }
        }

        res.json(productos); // Devuelve los productos traducidos como respuesta JSON
    } catch (error) {
        console.error('Error al obtener los productos:', error.message);
        res.status(500).send('Error al obtener los productos desde la API.');
    }
});


// Inicia el servidor y escucha en el puerto especificado
app.listen(port, () => {
    console.log(`Servidor escuchando muy atentamente en el puerto:${port}`);
});
