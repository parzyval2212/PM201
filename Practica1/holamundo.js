/*Js del lado del servidor*/

console.log("Hola Mundo JS con Node");

/* calculo */
let edad1=12;
let edad2=34;

console.log("Edad promedio: "+(edad1+edad2)/2);

/*medir tiempo del proceso*/
console.time("miProceso")

for(let i=0; i<100000000; i++){

}
console.timeEnd("miProceso")

/*objetos tipo tabla*/
let usuarios=[
    {nombre:"Cristopher", edad: 20},
    {nombre:"Josue", edad: 30}
]

console.table(usuarios)