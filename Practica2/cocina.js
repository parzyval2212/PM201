//Array sobre los productos de la cocina

let productos = []; //Array donde se almacenaran todos los productos de la conina


//Funcion para agregar un producto a la cocina
function agregar_producto(nombre, precio, cantidad, fecha_caducidad) {
    productos.push({nombre, precio, cantidad, fecha_caducidad}); //Agrega un nuevo producto al final del array
}

//Funcion para editar un producto de la cocina
function editar_funcion(index, nuevoNombre, nuevoPrecio, nuevaCantidad, nuevaFechaCaducidad) //index es la posicion del producto en el array comenzando de 0
{
    if (productos[index]) {
        productos[index].nombre = nuevoNombre;
        productos[index].precio = nuevoPrecio;
        productos[index].cantidad = nuevaCantidad;
        productos[index].fecha_caducidad = nuevaFechaCaducidad;
    } else {
        console.log("Producto no encontrado");
    }
}

//Funcion para elimnar un produto de la cocina

function eliminar_producto(index){
    if (productos[index]){
        productos.splice(index, 1); //Elimina el producto en la prosicion index del array
    }else{
        console.log("Producto no encontrado");
    }
}

//funcion para mostrar en forma de lista todos los productos de la cocina
function mostrar_productos(){
    console.log("Productos existentes en la cocina:");
    console.table(productos);
}

//Menu 
function menu(){
    let opcion;

    do{ 
        opcion = prompt(
            "¿Qué deseas hacer?\n" +
            "1. Agregar producto\n" +
            "2. Mostrar productos\n" +
            "3. Editar producto\n" +
            "4. Eliminar producto\n" +
            "5. Salir"
        );
        
        switch(opcion){
            case "1":

                let nombre= prompt("Ingresa el nombre del producto nuevo:");
                let precio=parseFloat(prompt("Ingresa el precio del producto nuevo: "));
                let cantidad=parseInt(prompt("Ingresa la cantidad de productos nuevos:"));
                let fecha_caducidad= prompt("Ingresa la fecha de caducidad del producto nuevo: ");

                agregar_producto(nombre, precio, cantidad, fecha_caducidad);
                break;

            case "2":
                mostrar_productos();
                break;
            
            case "3":
                mostrar_productos();
                let indexEditar=perseInt(prompt("Ingresa el numero del producto que se desea editar:"));
                
                let nuevoNombre=prompt("Ingresa el nuevo nombre del producto:");
                let nuevoPrecio=parseFloat(prompt("Ingresa el nuevo precio del producto: "));
                let nuevaCantidad=parseInt(prompt("Ingresa la nueva cantidad de productos: "));
                let nuevaFechaCaducidad= prompt("Ingresa la nueva fecha de caducidad del producto: ");

                editar_funcion(indexEditar, nuevoNombre, nuevoPrecio, nuevaCantidad, nuevaFechaCaducidad);
                break;
            case "3":
                mostrar_productos();
                let indexEliminar=perseInt(prompt("Ingresa el numero del producto que se desea eliminar:"));
                eliminar_producto(indexEliminar);
                break;
            case "5":
                console.log("Saliendo del programa... Vuelve pronto!");
                break;
            default:
                console.log("La opcion ingresada no existe, vuelve a intentarlo");
        }
    }while (opcion !=="5");

}

menu();