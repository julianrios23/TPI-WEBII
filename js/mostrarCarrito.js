document.addEventListener('DOMContentLoaded', function () {
    const carritoContainer = document.getElementById('carrito');
    const carritoVacioMsg = document.getElementById('carrito-vacio');
    const totalCarritoElement = document.getElementById('total-carrito'); // Elemento para mostrar el total del carrito
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    function mostrarCarrito() {
    carritoContainer.innerHTML = '';
    carritoVacioMsg.style.display = 'none';

    if (carrito.length === 0) {
        carritoVacioMsg.style.display = 'block';
        totalCarritoElement.textContent = 'Total: $0.00'; // Establecer texto a "$0.00" cuando el carrito esté vacío
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
                    <button onclick="agregarUnidad(${index})">Agregar Unidad</button>
                    <button onclick="eliminarProducto(${index})">Eliminar Producto</button>
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

    window.eliminarProducto = function (index) {
        carrito.splice(index, 1);
        actualizarCarrito();
    };

    function actualizarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostrarCarrito();
    }

    function comprar() {
        // Lógica para comprar los productos
        alert('¡Gracias por su compra!');
        vaciarCarr(); // Aquí deberías llamar a la función vaciarCarr() en lugar de vaciarCarrito()
    }

    function vaciarCarr() { // Cambié el nombre de la función para evitar conflictos de nombres
        carrito = [];
        localStorage.removeItem('carrito');
        mostrarCarrito();
    }

    mostrarCarrito();
});
