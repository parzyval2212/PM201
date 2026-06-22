//Zona 1: importación de archivos y componentes.
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button} from 'react-native';
import React,{useState} from 'react';
import TarjetasScreen from './TarjetasScreen';
import {Componente1} from './Componente1';
import {Componente4_0} from './Componente4_0';

//Zona2: Componentes
export default function App() {
    const[screen, setScreen] = useState('menu');

    switch(screen){
        case 'tarjetas':
            return <TarjetasScreen/>;
        case 'componente1':
            return <Componente1/>;
        case 'componente4_0':
            return <Componente4_0/>;
        case 'menu':
            default:
            return (
                <View>
                    <Text>Menu de Praticas</Text>

                    <Button title='Practica Tarjetas' onPress={() => setScreen('tarjetas')}/>
                    <Button title='Practica Componentes' onPress={() => setScreen('componente1')}/> 
                    <Button title="Practica 4" onPress={() => {setScreen('componente4_0');}}/>

                </View>
            );// cierra return
    }// cierra el switch
}//cierra mi funcion  

//Zona3: Estilos y posicionamiento
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
});