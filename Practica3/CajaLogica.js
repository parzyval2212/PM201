// CajaLogica.js
const cocina = require('./cocina.js'); // Importa los productos de cocina
const productos = cocina.productos;    // Usa los mismos productos registrados en cocina

// Array de pedidos
const pedidos = [];

// Función para agregar un pedido
function agregarPedido(nombre, precio) {
    const producto = productos.find(p => p.nombre.toLowerCase() === nombre.toLowerCase());

    if (!producto) {
        console.log("El producto no fue encontrado en cocina");
        return;
    }

    let precioFinal = precio;

    // Aplicación de promoción si existe
    if (producto.promocion) {
        if (producto.promocion.tipo === "descuento") {
            precioFinal = precioFinal - (precioFinal * producto.promocion.valor / 100);
        } else if (producto.promocion.tipo.toLowerCase() === "dos por uno" || producto.promocion.tipo.toLowerCase() === "2x1") {
            precioFinal = precioFinal / 2;
        }
    }

    const pedido = { nombre: producto.nombre, precio: precioFinal };
    pedidos.push(pedido);
    console.log("Pedido agregado:", pedido);
}

// Función para calcular el total acumulado de los pedidos
function totalAcumulado() {
    return pedidos.reduce((total, pedido) => total + pedido.precio, 0);
}

// Función para limpiar pedidos después de finalizar la compra
function limpiarPedidos() {
    pedidos.length = 0;
}

// Funcion para obtener el IVA del total acumulado
function calcularIVA() {
    const iva = totalAcumulado() * 0.16;
    return iva;
}
function mostrarTotalConIVA() {
    const TotalConIVA = totalAcumulado() + calcularIVA();
    return TotalConIVA;
}

// Función para mostrar el total acumulado
function mostrarTotal() {
    console.log("Total acumulado:", totalAcumulado());
}

// Exportar las funciones para su uso en otros archivos
module.exports = {
    pedidos,
    productos,
    agregarPedido,
    totalAcumulado,
    mostrarTotal,
    calcularIVA,
    mostrarTotalConIVA,
    limpiarPedidos,
};
