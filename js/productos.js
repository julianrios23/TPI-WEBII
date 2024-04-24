fetch('http://localhost:3000/ofertas.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('La respuesta de la red no fue exitosa');
        }
        return response.json();
    })
    .then(ofertasData => {
        const ofertas = ofertasData.ofertas; 
        
        
        fetch('http://localhost:3000/productos-traducidos')
            .then(response => {
                if (!response.ok) {
                    throw new Error('La respuesta de la red no fue exitosa');
                }
                return response.json();
            })
            .then(productosData => {
                const productos = productosData;
                
               
                aplicarOfertasDescuento(productos, ofertas);
                
               
                renderizarProductos(productos);
            })
            .catch(error => {
                console.error('Error al obtener los productos:', error);
            });
    })
    .catch(error => {
        console.error('Error al obtener las ofertas:', error);
    });

function aplicarOfertasDescuento(productos, ofertas) {
    productos.forEach(producto => {
        const oferta = ofertas.find(oferta => oferta.id === producto.id);
        if (oferta) {
            const precioConDescuento = producto.price * (1 - oferta.descuento / 100);
            producto.price = precioConDescuento;
            producto.ofertaAplicada = oferta;
        }
    });
}

function renderizarProductos(productos) {
    const productosDiv = document.getElementById('productos');
    productos.forEach(producto => {
        const precioOriginal = Math.round(producto.price * 100) / 100; 
        const ofertaAplicada = producto.ofertaAplicada ? producto.ofertaAplicada.descuento : 0;
        
        const productoElement = document.createElement('div');
        productoElement.classList.add('producto');
        
        if (ofertaAplicada > 0) {
            const precioConDescuento = Math.round((precioOriginal * (100 - ofertaAplicada)) / 100 * 100) / 100; 
            productoElement.classList.add('oferta');
            productoElement.innerHTML = `
                <img src="${producto.image}" alt="${producto.title}" class="imagen-producto">
                <span class="oferta-icono">¡O F E R T A!</span>
                <div class="info-producto" 
                    data-full-description="${producto.description}" 
                    data-short-description="${producto.description.slice(0, 30)}">
                    <h2 style="font-weight: bold; font-size: 20px; color:red">${producto.title}</h2>
                    <p class="descripcion-corta">${(producto.description).slice(0, 30)}</p>
                    <p class="negrita-negra"><strong>Precio:</strong> $${precioOriginal}</p>
					<p class="negrita-negra"><strong>Descuento:</strong> ${ofertaAplicada}%</p>
					<p class="negrita-negra"><strong>Precio Final:</strong> $${precioConDescuento}</p>
                    
                    
                    <a href="#" class="add-to-cart">
                        <button onclick="agregarAlCarrito(${producto.id}, '${producto.title}', ${precioConDescuento}, '${producto.image}')">Agregar al carrito</button>
                    </a>
                </div>
            `;
        } else {
            productoElement.innerHTML = `
                <img src="${producto.image}" alt="${producto.title}" class="imagen-producto">
                <div class="info-producto" 
                    data-full-description="${producto.description}" 
                    data-short-description="${producto.description.slice(0, 30)}">
                    <h2 style="font-weight: bold; font-size: 20px">${producto.title}</h2>
                    <p class="descripcion-corta">${(producto.description).slice(0, 30)}</p>
                    <p class="negrita-negra"><strong>Precio:</strong> $${precioOriginal}</p>
                    <a href="#" class="add-to-cart">
                        <button onclick="agregarAlCarrito(${producto.id}, '${producto.title}', ${precioOriginal}, '${producto.image}')">Agregar al carrito</button>
                    </a>
                </div>
            `;
        }
        
        productosDiv.appendChild(productoElement);

        // mouseover para mostrar la descripción completa
        productoElement.querySelector('.info-producto').addEventListener("mouseover", function() {
            this.querySelector('.descripcion-corta').textContent = (producto.description);
        });

        // mouseout para mostrar la descripción corta nuevamente
        productoElement.querySelector('.info-producto').addEventListener("mouseout", function() {
            this.querySelector('.descripcion-corta').textContent = (producto.description).slice(0, 30);
        });
    });
}
