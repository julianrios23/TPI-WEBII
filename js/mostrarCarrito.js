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
						<span class="bi bi-plus"></span> Agregar
						</button>

                        <button onclick="restarUnidad(${index})">
						<span class="bi bi-dash"></span> Restar
						</button>

                        <button onclick="eliminarProducto(${index})">
						<span class="bi bi-trash"></span> Eliminar Producto
						</button>
                    </div>
                </div>
            `;

            carritoContainer.appendChild(productoCard);

            // Calcular el costo total del producto y agregarlo al total del carrito
            totalCarrito += producto.price * producto.cantidad;
        });

        // Mostrar el total del carrito
        if (totalCarrito === 0) {
            totalCarritoElement.textContent = 'Total: $0.00'; // Establecer texto a "$0.00" cuando el carrito esté vacío
        } else {
            totalCarritoElement.textContent = `Total: $${totalCarrito.toFixed(2)}`;
        }
    }

    window.agregarUnidad = function (index) {
        carrito[index].cantidad++;
        actualizarCarrito();
    };

    window.restarUnidad = function (index) {
        // Verificar que la cantidad de unidades sea mayor que 1 antes de restar
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

    function comprar() {
        // Obtiene los productos del carrito desde localStorage
        const carrito = JSON.parse(localStorage.getItem('carrito'));

        // Realiza una solicitud POST al servidor para registrar la compra
        fetch('http://localhost:3000/comprar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(carrito) // Envía los productos del carrito al servidor
        })
        .then(response => {
            if (response.ok) {
                // La compra se registró correctamente
                console.log('Compra registrada exitosamente');
                alert('¡Gracias por su compra!');
            } else {
                // Hubo un error al registrar la compra
                console.error('Error al registrar la compra');
                alert('¡Error al registrar la compra!');
            }
        })
        .catch(error => {
            console.error('Error de red:', error);
            alert('¡Error de red al registrar la compra!');
        });
    }

    function vaciarCarrito() { 
        carrito = [];
        localStorage.removeItem('carrito');
        mostrarCarrito();
    }

    mostrarCarrito();
});
