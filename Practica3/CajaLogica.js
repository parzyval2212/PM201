// CajaLogica.js
const cocina = require('./cocina.js'); // Importa los productos de cocina
const productos = cocina.productos;    // Usa los mismos productos registrados en cocina

// Array de pedidos
const pedidos = [];

// Función para agregar un pedido
function agregarPedido(nombre, precio) {
    const pedido = { nombre, precio };
    pedidos.push(pedido);
    console.log("Pedido agregado:", pedido);
}

// Función para calcular el total acumulado de los pedidos
function totalAcumulado() {
    return pedidos.reduce((total, pedido) => total + pedido.precio, 0);
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
    mostrarTotalConIVA
};
