import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable} from 'react-native';

export const Expo2 = () => {  
    // State para almacenar el contador
    const [contador, setContador] = useState(0);
    // State para almacenar el mensaje
    const [mensaje, setMensaje] = useState('');
    
    return(
        // Componente principal
        <View style={styles.container}>
            <Text>Componente pressable</Text>

            <Pressable
                onPress={() => {setContador(contador + 1);}}
                onLongPress={() => {
                    setContador(0);
                    setMensaje('Contador reiniciado');
                }}
                onPressIn={() => {setMensaje('Presionando...');}}
                onPressOut={() => {setMensaje('Boton liberado...');}}
                style={({ pressed }) => [
                    styles.button,
                    pressed ? styles.botonPresionado 
                    : styles.botonNormal
                ]}
            >
            <Text style={styles.textoBoton}>Presioname</Text>
            </Pressable>

             <Text style={styles.texto}>Contador: {contador}</Text>
            <Text style={styles.texto}>Estado: {mensaje}</Text>
            <Text>Manten presionado el boton para reiniciar el contador</Text>
        </View>

    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15
    },

    titulo: {
        fontSize: 24,
        fontWeight: 'bold'
    },

    boton: {
        padding: 15,
        borderRadius: 10,
        width: 180,
        alignItems: 'center'
    },

    textoBoton: {
        color: 'black',
        fontWeight: 'bold'
    }

});
