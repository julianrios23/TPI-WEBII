document.addEventListener("DOMContentLoaded", function() {
    fetch('https://fakestoreapi.com/products')
        .then(response => {
            if (!response.ok) {
                throw new Error('La respuesta de la red no fue exitosa');
            }
            return response.json();
        })
        .then(data => {
            // Renderizar los productos
            renderizarProductos(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

// Función para renderizar los productos en el DOM
function renderizarProductos(productos) {
    const productosDiv = document.getElementById('productos');
    productos.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.classList.add('producto');
        productoElement.innerHTML = `
            <img src="${producto.image}" alt="${producto.title}" class="imagen-producto">
            <div class="info-producto" 
                data-full-description="${producto.description}" 
                data-short-description="${producto.description.slice(0, 30)}">
                <h2>${translateToSpanish(producto.title)}</h2>
                <p class="descripcion-corta">${translateToSpanish(producto.description).slice(0, 30)}</p>
                <p><strong>Categoría:</strong> ${translateToSpanish(producto.category)}</p>
                <p><strong>Precio:</strong> $${producto.price}</p>
                <a href="#" class="add-to-cart">
                    <button onclick="agregarAlCarrito(${producto.id}, '${producto.title}', ${producto.price}, '${producto.image}')">Agregar al carrito</button>
                </a>
            </div>
        `;
        productosDiv.appendChild(productoElement);

        // mouseover para mostrar la descripción completa
        productoElement.querySelector('.info-producto').addEventListener("mouseover", function() {
            // Reemplazar la descripción corta con la descripción completa
            this.querySelector('.descripcion-corta').textContent = translateToSpanish(producto.description);
        });

        // mouseout para mostrar la descripción corta nuevamente
        productoElement.querySelector('.info-producto').addEventListener("mouseout", function() {
            // Reemplazar la descripción completa con la descripción corta
            this.querySelector('.descripcion-corta').textContent = translateToSpanish(producto.description).slice(0, 30);
        });
    });
}

// Función de traducción simple
function translateToSpanish(text) {
    // Aquí puedes implementar tu lógica de traducción
    // Por simplicidad, aquí solo devuelvo el texto en mayúsculas
    return text.toUpperCase();
}

