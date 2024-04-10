let carrito = []; // Variable para almacenar los productos del carrito

// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
    carrito.push(producto);
}

// Event listener para el botón de agregar al carrito
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('agregar-carrito')) {
        // Obtener el producto correspondiente al botón
        let producto = carrito.find(p => p.id === parseInt(event.target.dataset.id));
        if (producto) {
            agregarAlCarrito(producto);
            // Actualizar el total en el carrito
            let total = calcularTotalCarrito();
            // Redirigir a la página del carrito con el carrito como parámetro de consulta
            irACarrito(total);
        }
    }
});
