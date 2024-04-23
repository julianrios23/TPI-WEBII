
fetch('http://localhost:3000/ofertas.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('La respuesta de la red no fue exitosa');
        }
        return response.json();
    })
    .then(data => {
        const ofertas = data.ofertas; 
        
        fetch('https://fakestoreapi.com/products')
            .then(response => {
                if (!response.ok) {
                    throw new Error('La respuesta de la red no fue exitosa');
                }
                return response.json();
            })
            .then(data => {
                
                aplicarOfertasDescuento(data, ofertas);
                
                renderizarProductos(data);
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

//renderizo para mostarr

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
                    <h2>${(producto.title)}</h2>
                    <p class="descripcion-corta">${(producto.description).slice(0, 30)}</p>
                    <p><strong>Precio Original:</strong> $${precioOriginal}</p>
                    <p><strong>Precio con Descuento:</strong> $${precioConDescuento}</p>
                    <p><strong>Descuento:</strong> ${ofertaAplicada}%</p>
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
                    <h2>${(producto.title)}</h2>
                    <p class="descripcion-corta">${(producto.description).slice(0, 30)}</p>
                    <p><strong>Precio Original:</strong> $${precioOriginal}</p>
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

