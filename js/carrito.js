
const productosContainer = document.getElementById('productos');


window.agregarAlCarrito = function (id, title, price, image) {
    
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
	

    
    const productoExistente = carrito.find(producto => producto.id === id);
    if (productoExistente) {
       
        productoExistente.cantidad++;
    } else {
       
        const nuevoProducto = { id, title, price, image, cantidad: 1 };
        carrito.push(nuevoProducto);
    }

    
    localStorage.setItem('carrito', JSON.stringify(carrito));

    
    console.log('Producto agregado al carrito:', { id, title, price, image });

    
    alert('¡Producto agregado al carrito!');
	
};
