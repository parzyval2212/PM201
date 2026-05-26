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
    console.log("6. Aplicar promoción a un producto");
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
                console.log("\n===== BÚSQUEDAS =====");
                console.log("1. Productos baratos");
                console.log("2. Productos caros");
                console.log("3. Bebidas");
                console.log("4. Postres");

                readline.question("Elige una opción de búsqueda: ", (busqueda) => {
                    let resultados = [];
                    if (busqueda === "1") resultados = cocina.buscarProductos("baratos");
                    else if (busqueda === "2") resultados = cocina.buscarProductos("caros");
                    else if (busqueda === "3") resultados = cocina.buscarProductos("bebidas");
                    else if (busqueda === "4") resultados = cocina.buscarProductos("postres");
                    else console.log("Opción inválida");

                    console.table(resultados);
                    menuCocina();
                });
                break;

            case "6":
                console.log("\nProductos disponibles para promo:");
                cocina.productos.forEach((producto, index) => {
                    const promocion = producto.promocion
                        ? producto.promocion.tipo === "descuento"
                            ? `${producto.promocion.valor}% off`
                            : "2x1"
                        : "Sin promo";
                    console.log(`${index + 1}. ${producto.nombre} - $${producto.precio} (${promocion})`);
                });
                readline.question("Número del producto para aplicar promoción: ", (index) => {
                    console.log("Tipos de promoción disponibles:");
                    console.log("1. Descuento");
                    console.log("2. Dos por uno");

                    readline.question("Elige tipo de promoción: ", (tipo) => {
                        if (tipo === "1") {
                            readline.question("Porcentaje de descuento: ", (valor) => {
                                cocina.Promociones(parseInt(index) - 1, "descuento", parseFloat(valor));
                                menuCocina();
                            });
                        } else if (tipo === "2") {
                            cocina.Promociones(parseInt(index) - 1, "dos por uno");
                            menuCocina();
                        } else {
                            console.log("Tipo inválido");
                            menuCocina();
                        }
                    });
                });
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
        
        const promocion = producto.promocion
            ? producto.promocion.tipo === "descuento"
                ? `${producto.promocion.valor}% off`
                : "2x1"
            : "Sin promo";

        console.log(`${index + 1}. ${producto.nombre} - $${producto.precio} (${promocion})`);

        
    });
    console.log("0. Finalizar compra");

    readline.question("\nIngrese el número del producto: ", (input) => {
        const productoIndex = parseInt(input) - 1;

        if (productoIndex >= 0 && productoIndex < cocina.productos.length) {
            const productoSeleccionado = cocina.productos[productoIndex];
            const pedido = caja.agregarPedido(
             productoSeleccionado.nombre,
             productoSeleccionado.precio
            );
            
            console.log(`\nProducto agregado: ${productoSeleccionado.nombre}`);
            cocina.prepararCafe(pedido)
                .then((mensaje) => {
                    console.log(`\n${mensaje} - ${pedido.nombre}`);
                    menuCaja();
                }
                ).catch((error) => {
                    console.log(`\nError: ${error} - ${pedido.nombre}`);
                    menuCaja();
                });
        } else if (input === "0") {
            console.log("\n===== COMPRA FINALIZADA =====");
            listarPedidos();
            caja.limpiarPedidos();
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
        console.log(`${index + 1}. ${pedido.nombre} - $${pedido.precio} - Estado: ${pedido.estado}`);
    });
    console.log(`\nTotal acumulado: $${caja.totalAcumulado()}`);
    console.log(`IVA (16%): $${caja.calcularIVA()}`);
    console.log(`Total con IVA: $${caja.mostrarTotalConIVA()}`);
}
