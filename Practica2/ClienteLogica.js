const caja = require('./CajaLogica.js');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log(" Bienvenido a la caja registradora ");

mostrarMenu();

function mostrarMenu() {

    console.log("\n===== MENÚ DE PRODUCTOS =====");

    caja.productos.forEach((producto, index) => {

        console.log(
            `${index + 1}. ${producto.nombre} - $${producto.precio}`
        );

    });

    console.log("0. Finalizar compra");

    readline.question(
        "\nIngrese el número del producto: ",
        (input) => {

            const productoIndex = parseInt(input) - 1;

            if (
                productoIndex >= 0 &&
                productoIndex < caja.productos.length
            ) {

                const productoSeleccionado =
                    caja.productos[productoIndex];

                caja.agregarPedido(
                    productoSeleccionado.nombre,
                    productoSeleccionado.precio
                );

                console.log(
                    `\nProducto agregado: ${productoSeleccionado.nombre}`
                );

                mostrarMenu();

            } else if (input === "0") {

                console.log("\n===== COMPRA FINALIZADA =====");

                listarPedidos();

                readline.close();

            } else {

                console.log("\nOpción inválida");

                mostrarMenu();
            }
        }
    );
}

function listarPedidos() {

    console.log("\n===== PEDIDOS REALIZADOS =====");

    caja.pedidos.forEach((pedido, index) => {

        console.log(
            `${index + 1}. ${pedido.nombre} - $${pedido.precio}`
        );

    });

    const total = caja.totalAcumulado();

    console.log("\n====================");
    console.log(`Total acumulado: $${total}`);
    console.log("====================");
}