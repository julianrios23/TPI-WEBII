document.addEventListener('DOMContentLoaded', function () {
    
	const carritoContainer = document.getElementById('carrito');
    const carritoVacioMsg = document.getElementById('carrito-vacio');
    const totalCarritoElement = document.getElementById('total-carrito');
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    function mostrarCarrito() {
        carritoContainer.innerHTML = '';
        carritoVacioMsg.style.display = 'none';

        if (carrito.length === 0) {
            carritoVacioMsg.style.display = 'block';
            totalCarritoElement.textContent = 'Total: $0.00';
            return;
        }

        let totalCarrito = 0;

        carrito.forEach((producto, index) => {
            const productoCard = document.createElement('div');
            productoCard.classList.add('producto-card');

            productoCard.innerHTML = `
                <img src="${producto.image}" alt="${producto.title}">
                <div class="producto-info">
                    <h3>${producto.title}</h3>
                    <p>Precio: ${producto.price}</p>
                    <p>Unidades: ${producto.cantidad}</p>
                    <div class="acciones">
                        <button onclick="agregarUnidad(${index})">
						<span class="bi bi-plus"></span> +
						</button>

                        <button onclick="restarUnidad(${index})">
						<span class="bi bi-dash"></span> -
						</button>

                        <button onclick="eliminarProducto(${index})">
						<span class="bi bi-trash"></span> Eliminar Producto
						</button>
                    </div>
                </div>
            `;

            carritoContainer.appendChild(productoCard);

            // costo total del producto
            totalCarrito += producto.price * producto.cantidad;
        });

        // total del carrito
        if (totalCarrito === 0) {
            totalCarritoElement.textContent = 'Total: $0.00'; 
        } else {
            totalCarritoElement.textContent = `Total: $${totalCarrito.toFixed(2)}`;
        }
    }

    window.agregarUnidad = function (index) {
        carrito[index].cantidad++;
        actualizarCarrito();
    };

    window.restarUnidad = function (index) {
       
        if (carrito[index].cantidad > 1) {
            carrito[index].cantidad--;
            actualizarCarrito();
        }
    };

    window.eliminarProducto = function (index) {
        carrito.splice(index, 1);
        actualizarCarrito();
    };

    function actualizarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
    }
	
    mostrarCarrito();
		
});


