const cocina = require('./cocina.js');
const caja = require('./CajaLogica.js');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log(" Bienvenido al sistema ");
menuPrincipal();

function menuPrincipal() {
    console.log("\n===== MENÚ PRINCIPAL =====");
    console.log("1. Gestión de cocina ");
    console.log("2. Caja ");
    console.log("0. Salir");

    readline.question("\nElige una opción: ", (opcion) => {
        switch(opcion) {
            case "1":
                menuCocina();
                break;
            case "2":
                menuCaja();
                break;
            case "0":
                console.log("Saliendo...");
                readline.close();
                break;
            default:
                console.log("Opción inválida");
                menuPrincipal();
        }
    });
}

// --- CRUD de cocina ---
function menuCocina() {
    console.log("\n===== MENÚ COCINA =====");
    console.log("1. Agregar producto");
    console.log("2. Mostrar productos");
    console.log("3. Editar producto");
    console.log("4. Eliminar producto");
    console.log("5. Buscar productos (baratos, caros, bebidas, postres)");
    console.log("0. Volver al menú principal");

    readline.question("\nElige una opción: ", (opcion) => {
        switch(opcion) {
            case "1":
                readline.question("Nombre: ", (nombre) => {
                    readline.question("Precio: ", (precio) => {
                        readline.question("Cantidad: ", (cantidad) => {
                            readline.question("Fecha caducidad: ", (fecha) => {
                                cocina.agregarProducto(nombre, parseFloat(precio), parseInt(cantidad), fecha);
                                console.log("Producto agregado!");
                                menuCocina();
                            });
                        });
                    });
                });
                break;
            case "2":
                cocina.mostrarProductos();
                menuCocina();
                break;
            case "3":
                cocina.mostrarProductos();
                readline.question("Número de producto a editar: ", (index) => {
                    readline.question("Nuevo nombre: ", (nombre) => {
                        readline.question("Nuevo precio: ", (precio) => {
                            readline.question("Nueva cantidad: ", (cantidad) => {
                                readline.question("Nueva fecha caducidad: ", (fecha) => {
                                    cocina.editarProducto(parseInt(index)-1, nombre, parseFloat(precio), parseInt(cantidad), fecha);
                                    console.log("Producto editado!");
                                    menuCocina();
                                });
                            });
                        });
                    });
                });
                break;
            case "4":
                cocina.mostrarProductos();
                readline.question("Número de producto a eliminar: ", (index) => {
                    cocina.eliminarProducto(parseInt(index)-1);
                    console.log("Producto eliminado!");
                    menuCocina();
                });
                break;
            case "5":
                const resultados = cocina.buscarProductosFiltros();
                console.log("Resultados de búsqueda:");
                console.table(resultados);
                menuCocina();
                break;
            case "0":
                menuPrincipal();
                break;
            default:
                console.log("Opción inválida");
                menuCocina();
        }
    });
}

// --- Caja (pedidos) ---
function menuCaja() {
    console.log("\n===== MENÚ DE PRODUCTOS =====");
    cocina.productos.forEach((producto, index) => {
        console.log(`${index + 1}. ${producto.nombre} - $${producto.precio}`);
    });
    console.log("0. Finalizar compra");

    readline.question("\nIngrese el número del producto: ", (input) => {
        const productoIndex = parseInt(input) - 1;

        if (productoIndex >= 0 && productoIndex < cocina.productos.length) {
            const productoSeleccionado = cocina.productos[productoIndex];
            caja.agregarPedido(productoSeleccionado.nombre, productoSeleccionado.precio);
            console.log(`\nProducto agregado: ${productoSeleccionado.nombre}`);
            menuCaja();
        } else if (input === "0") {
            console.log("\n===== COMPRA FINALIZADA =====");
            listarPedidos();
            menuPrincipal();
        } else {
            console.log("\nOpción inválida");
            menuCaja();
        }
    });
}

function listarPedidos() {
    console.log("\n===== PEDIDOS REALIZADOS =====");
    caja.pedidos.forEach((pedido, index) => {
        console.log(`${index + 1}. ${pedido.nombre} - $${pedido.precio}`);
    });
    console.log(`\nTotal acumulado: $${caja.totalAcumulado()}`);
    console.log(`IVA (16%): $${caja.calcularIVA()}`);
    console.log(`Total con IVA: $${caja.mostrarTotalConIVA()}`);
}
