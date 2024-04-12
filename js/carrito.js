// Obtener el contenedor de productos
const productosContainer = document.getElementById('productos');

// Función para agregar productos al carrito
window.agregarAlCarrito = function (id, title, price, image) {
    // Obtener el contenido del carrito del localStorage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(producto => producto.id === id);
    if (productoExistente) {
        // Si el producto ya está en el carrito, incrementar la cantidad
        productoExistente.cantidad++;
    } else {
        // Si el producto no está en el carrito, agregarlo con cantidad 1
        const nuevoProducto = { id, title, price, image, cantidad: 1 };
        carrito.push(nuevoProducto);
    }

    // Guardar el contenido del carrito en el localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Actualizar la UI o cualquier otra lógica necesaria
    console.log('Producto agregado al carrito:', { id, title, price, image });

    // Mostrar un mensaje de confirmación
    alert('¡Producto agregado al carrito!');
};
