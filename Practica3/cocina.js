// cocina
// Productos iniciales registrados en la cocina
let productos = [
    { nombre: "Cafe Americano", precio: 10, cantidad: 20, fechaCaducidad: "2026-12-31", categoria: "bebida" },
    { nombre: "Cafe con Leche", precio: 12, cantidad: 15, fechaCaducidad: "2026-12-31", categoria: "bebida" },
    { nombre: "Cafe Capuchino", precio: 15, cantidad: 10, fechaCaducidad: "2026-12-31", categoria: "bebida" },
    { nombre: "Cafe Expreso", precio: 8, cantidad: 25, fechaCaducidad: "2026-12-31", categoria: "bebida" }
];


// Agregar producto
function agregarProducto(nombre, precio, cantidad, fechaCaducidad, categoria) {
    productos.push({ nombre, precio, cantidad, fechaCaducidad, categoria });
}

// Editar producto
function editarProducto(index, nuevoNombre, nuevoPrecio, nuevaCantidad, nuevaFechaCaducidad) {
    if (productos[index]) {
        productos[index].nombre = nuevoNombre;
        productos[index].precio = nuevoPrecio;
        productos[index].cantidad = nuevaCantidad;
        productos[index].fechaCaducidad = nuevaFechaCaducidad;
    } else {
        console.log("Producto no encontrado");
    }
}

// Eliminar producto
function eliminarProducto(index) {
    if (productos[index]) {
        productos.splice(index, 1);
    } else {
        console.log("Producto no encontrado");
    }
}

// Mostrar productos
function mostrarProductos() {
    console.log("Productos existentes en la cocina:");
    const productosFormateados = productos.map((producto, index) => ({
        No: index + 1,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: producto.cantidad,
        fechaCaducidad: producto.fechaCaducidad,
        categoria: producto.categoria,
        promocion: producto.promocion
            ? (producto.promocion.tipo === "descuento"
                ? `Descuento ${producto.promocion.valor}%`
                : "2x1")
            : "Ninguna"
    }));
    console.table(productosFormateados);
}



//Buscar un producto barata, productos caros, bebidad, postres
function buscarProductos(filtro) {
    switch(filtro.toLowerCase()) {
        case "baratos":
            return productos.filter(producto => producto.precio < 10);
        case "caros":
            return productos.filter(producto => producto.precio >= 10);
        case "bebidas":
            return productos.filter(producto => producto.categoria === "bebida");
        case "postres":
            return productos.filter(producto => producto.categoria === "postre");
        default:
            console.log("Filtro no válido. Usa: baratos, caros, bebidas, postres.");
            return [];
    }
}



//Promocion
function Promociones(index, tipoPromocion, valor = null) {
    const producto = productos[index]; 

    if (!producto) {
        console.log("Producto no encontrado.");
        return;
    }

    if (tipoPromocion.toLowerCase() === "descuento") {
        producto.promocion = { tipo: "descuento", valor: valor };
        console.log(`Promoción aplicada: ${valor}% de descuento en ${producto.nombre}`);
    } else if (tipoPromocion.toLowerCase() === "dos por uno") {
        producto.promocion = { tipo: "dos por uno" };
        console.log(`Promoción aplicada: 2x1 en ${producto.nombre}`);
    } else {
        console.log("Tipo de promoción no válido. Usa: descuento o dos por uno.");
    }
}

// Exportar para que otros módulos (Caja y Cliente) usen los mismos productos
module.exports = {
    productos,
    agregarProducto,
    editarProducto,
    eliminarProducto,
    mostrarProductos,
    buscarProductos, 
    Promociones
};
