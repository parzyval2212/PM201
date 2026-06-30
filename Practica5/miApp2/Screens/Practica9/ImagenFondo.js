import { View, Text, Button, StyleSheet, Pressable } from 'react-native';
import React,{useState} from 'react';
import { ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Perfil } from '../../components/Perfil';

const fondo_1 = require('../../assets/fushi.jpg')
const fondo_2 = require('../../assets/fondo2.png')
export const ImagenFondo = () => {
    const [fondo, setFondo] = useState(false);

    return (
        <ImageBackground
            style={styles.container}
            source={fondo ? fondo_1 : fondo_2}
            resizeMode='cover'
            imageStyle={{opacity: 0.8}}
            blurRadius={6}
        >
            <View style={styles.vista}>
                <Pressable
                    style={styles.boton}
                    onPress={() => setFondo(!fondo)}
                >
                    <Text>Cambiar Fondo</Text>
                </Pressable>
            </View>
            
        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    vista: {
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    boton: {
        backgroundColor: '#6484b1',
        padding: 10,
        borderRadius: 10
    }
});