


//La funcion de flecha omra de simplificar funciones

/* PERFIL USANDO PROPS: Es una forma de pasar información a los componentes,
 es decir, se pueden enviar datos desde un componente padre a un componente 
 hijo. En este caso, el componente Perfil recibe las propiedades nombre, carrera, 
 materia y cuatrimestre, que son pasadas desde el componente App. 
 Estas propiedades se pueden utilizar dentro del componente Perfil para mostrar 
 la información correspondiente. 


export const Perfil=(props) =>{
    return(
        <View>
            <Text>Nombre : {props.nombre}{'\n'} </Text>
            <Text>Carrera : {props.carrera} {'\n'} </Text>
            <Text>Materia : {props.materia}{'\n'} </Text>
            <Text>Cuatrimestre : {props.cuatrimestre} {'\n'}</Text>
        </View>
    )
}
*/

/*PERFIL usando destructuring */ 

import {View, Text, Button, StyleSheet} from 'react-native';
import React,{useState} from 'react';
export const Perfil = ({nombre, carrera, materia, cuatrimestre, style}) => {
    const[mostrar, setMostrar] = useState(false);

    return(
        <View style={[estilos.tarjeta, style]}>

            {mostrar && 
                <>
                    <Text style={estilos.nombre}> {nombre} </Text>
                    <Text style = {estilos.carrera}>{carrera} {'\n'} </Text>
                    <Text style={estilos.otroTexto}>{materia}{'\n'} </Text>
                    <Text style={estilos.otroTexto}>{cuatrimestre} {'\n'}</Text>
                </>
            }
            <Button title="Ver perfil" onPress={() => setMostrar(!mostrar)} />
        </View>
    )

}

const estilos = StyleSheet.create({
    nombre:{
        fontSize: 20,
        fontWeight: 600,
        textTransform: 'uppercase',
    },
    carrera:{
        fontSize: 18,
        color: 'blue',
        fontfamily: 'Roboto',
    },
    otroTexto:{
        fontSize: 12,
        fontfamily: 'Courier',
        fontStyle: 'italic',
    },
    tarjeta:{
        borderWidth: 2,
        padding: 25,
        margin: 20,

    }

});
