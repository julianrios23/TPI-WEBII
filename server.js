const express = require('express');
const app = express();
const path = require('path');
const translate = require('node-google-translate-skidz');
const axios = require('axios'); 
const port = 3000; 

//  CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); 
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Ruta ofertas.json
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

// Endpoint 
app.get('/productos-traducidos', async (req, res) => {
    const apiUrl = 'https://fakestoreapi.com/products';

    try {
        const response = await axios.get(apiUrl);

        if (response.status !== 200) {
            throw new Error('La solicitud a la API falló.');
        }

        const productos = response.data;

        
        for (let producto of productos) {
           
            producto.title = await dynamicTranslate(producto.title);

           
            if (producto.description) {
                producto.description = await dynamicTranslate(producto.description);
            }
        }

        res.json(productos); 
    } catch (error) {
        console.error('Error al obtener los productos:', error.message);
        res.status(500).send('Error al obtener los productos desde la API.');
    }
});



app.listen(port, () => {
    console.log(`Servidor escuchando muy atentamente en el puerto:${port}`);
});
