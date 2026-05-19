const productos = [];
// Agregar productos al menú

productos.push({ nombre: "Cafe Americano", precio: 10 });
productos.push({ nombre: "Cafe con Leche", precio: 12 });
productos.push({ nombre: "Cafe Capuchino", precio: 15 });
productos.push({ nombre: "Cafe Expreso", precio: 8 });
// Mostrar el menú de productos
console.table(productos);
// Función para agregar un pedido
const pedidos = [];

function agregarPedido(nombre, precio) {
    const pedido = { nombre, precio };
    pedidos.push(pedido);
    console.log("Pedido agregado: ", pedido);
}
// Función para calcular el total acumulado de los pedidos
const totalAcumulado = () => {
    let total = 0;
    pedidos.forEach(pedido => {
        total += pedido.precio;
    });
    return total;
};
// Función para mostrar el total acumulado
function mostrarTotal() {
    const total = totalAcumulado();
    console.log("Total acumulado: ", total);
}
// Exportar las funciones para su uso en otros archivos
module.exports = {
    pedidos,
    productos,
    agregarPedido,
    totalAcumulado,
    mostrarTotal };

