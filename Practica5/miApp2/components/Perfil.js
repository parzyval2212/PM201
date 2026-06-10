


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

import {View, Text, Button} from 'react-native';
import React,{useState} from 'react';

export const Perfil = ({nombre, carrera, materia, cuatrimestre}) => {
    const[mostrar, setMostrar] = useState(false);

    return(
        <View>
            <Text>Nombre : {nombre}{'\n'} </Text>

            {mostrar && 
                <>
                    <Text>Carrera : {carrera} {'\n'} </Text>
                    <Text>Materia : {materia}{'\n'} </Text>
                    <Text>Cuatrimestre : {cuatrimestre} {'\n'}</Text>
                </>
            }
            <Button title="Ver perfil" onPress={() => setMostrar(!mostrar)} />
        </View>
    )

}