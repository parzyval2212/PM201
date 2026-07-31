import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import React,{useState} from 'react';

export const TarjetaPlatillo = ({nombre, precio, paisOrigen, comentario, setComentario}) => {
    const[mostrar, setMostrar] = useState(false);
    //const {comentario, setComentario}=useState('');
    const guardarComentario = () => {
        if (comentario==""){
            Alert.alert('Error', 'Debes de agregar un comentario');
            return;
        }

    }

    
    return(
        <View style={[estilos.tarjeta, estilos]}>
            <Text style={estilos.nombre}>{nombre}</Text>
            <Text style={estilos.precio}>${precio.toFixed(2)}</Text>
            <Text style={estilos.pais}>De {paisOrigen}</Text>

            <TextInput
                style={estilos.input}
                placeholder='Agrega un comentario'
                value={comentario}
                onChangeText={setComentario}
            />
            <Text style={[estilos.nomre]}>{Comentario>comentario}</Text>

            <Pressable
                style={estilos.boton}
                onPress={guardarComentario}
            >
                <Text style={estilos.textoBoton}>Guardar comentario</Text>
            </Pressable>
            
            
        </View>
        
    )

}

const estilos = StyleSheet.create({
    nombre:{
        fontSize: 20,
        fontWeight: 600,
        textTransform: 'uppercase',
    },
    precio:{
        fontSize: 18,
        color: 'green',
        fontWeight: 600,
    },
    pais:{
        fontSize: 14,
        color: 'gray',
    },
    tarjeta:{
        borderWidth: 2,
        padding: 25,
        margin: 20,

    }

});



