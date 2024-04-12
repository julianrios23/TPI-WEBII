

    document.addEventListener("DOMContentLoaded", function() {
    fetch('https://fakestoreapi.com/products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const productosDiv = document.getElementById('productos');
            data.forEach(producto => {
                const productoElement = document.createElement('div');
                productoElement.classList.add('producto');
                productoElement.innerHTML = `
                    <img src="${producto.image}" alt="${producto.title}" class="imagen-producto">
                    <div class="info-producto" 
                        data-full-description="${producto.description}" 
                        data-short-description="${producto.description.slice(0, 30)}">
                        <h2>${producto.title}</h2>
                        <p class="descripcion-corta">${producto.description.slice(0, 30)}</p>
                        <p><strong>Categoría:</strong> ${producto.category}</p>
                        <p><strong>Precio:</strong> $${producto.price}</p>
                        <a href="#" class="add-to-cart">
						<button onclick="agregarAlCarrito('Nombre del Producto', 100)">Agregar al Carrito</button>
						</a>

                    </div>
                `;
                productosDiv.appendChild(productoElement);
				
				


                // Agregar evento mouseover para mostrar la descripción completa
                productoElement.querySelector('.info-producto').addEventListener("mouseover", function() {
                    // Reemplazar la descripción corta con la descripción completa
                    this.querySelector('.descripcion-corta').textContent = producto.description;
                });

                // Agregar evento mouseout para mostrar la descripción corta nuevamente
                productoElement.querySelector('.info-producto').addEventListener("mouseout", function() {
                    // Reemplazar la descripción completa con la descripción corta
                    this.querySelector('.descripcion-corta').textContent = producto.description.slice(0, 30);
                });
            });
        })
		
		
        .catch(error => {
            console.error('Error:', error);
        });
});
    
    
    

