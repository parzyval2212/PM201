// cocina
// Productos iniciales registrados en la cocina
let productos = [
    { nombre: "Cafe Americano", precio: 10, cantidad: 20, fechaCaducidad: "2026-12-31" },
    { nombre: "Cafe con Leche", precio: 12, cantidad: 15, fechaCaducidad: "2026-12-31" },
    { nombre: "Cafe Capuchino", precio: 15, cantidad: 10, fechaCaducidad: "2026-12-31" },
    { nombre: "Cafe Expreso", precio: 8, cantidad: 25, fechaCaducidad: "2026-12-31" }
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
    console.table(productos);
}

//Buscar un producto barata, productos caros, bebidad, postres
function buscarProductosBaratos(){
    return productos.filter(productos=>productos.precio<10);

}
//Buscar productos(caros, baratos, bebidas y postres)
function buscarProductosFiltros(){
    return productos.filter(productos=>productos.precio<10 || productos.precio>10 || productos.categoria=="Bebida" || productos.categoria=="Postres");
}


//Promocion
function promociones(nombreProducto, tipoPromocion, valor = null) {
    const producto = productos.find(producto => producto.nombre.toLowerCase() === nombreProducto.toLowerCase());

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

//Funcion de promesa
function prepararCafe(){
    return new Promise((resolve, reject)=>{ //Creamosnuestra promesa.
        const productos=productos[index]; //Obtenemos el producto de nuestro arreglo

        if (!producto){ //Si el producto no existe noe muestra un mensaje
            reject("Producto no encontrado");
            return;
        } 

        //Si el producto existe nos envia un mensaje para avisarnos que se esta preparando el producto.
        console.log("Preparando tu pedidos.." + productos.nombre);

        setTimeout(()=>{
            //Simula que la preparacion del producto tarda 2 segundos en prepararse 
            //Math.floor genera un numero aleatorio entre 0,1,2 y ese numero decide 
            // el reultado de la preparacion del producto.
            const resultado = Math.floor(Math.random()*3); 

            if (resultado === 0){
                resolve("Tu pedido esta listo");
            }else if (resultado==1){
                reject("Ocurrio un error en la preparacion del pedido, intenta una vez más");
            }else{
                reject("Falta un ingrediente para completar tu pedido, selecciona otro producto"); 
            }
        });
    }, 2000); //Simulamos que la preparacion del producto se tarda dos segundos
}


// Exportar para que otros módulos (Caja y Cliente) usen los mismos productos
module.exports = {
    productos,
    agregarProducto,
    editarProducto,
    eliminarProducto,
    mostrarProductos, 
    promociones, 
    prepararCafe
};
