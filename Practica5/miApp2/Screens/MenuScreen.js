//Zona 1: importación de archivos y componentes.
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button} from 'react-native';
import TarjetasScreen from './TarjetasScreen';
import Componente1 from './Componente1';
import {Componente4_0} from './Componente4_0';
import {Expo1} from './Expo1';
import { Expo2 } from './Expo2';
import { Expo2SWITCH } from './Expo2SWITCH';
import { FlatListScreen } from './FlatListScreen';
import { SectionListScreen } from './SectionListScreen';
//imports de practica9
import React,{Component, useEffect, useState} from 'react';
import { ImagenFondo } from './Practica9/ImagenFondo';
import { SplashScreen } from './Practica9/SplashScreen';
import { Home } from './Practica9/Home';
//import practica modal
import { MiModal } from '../components/MiModal';


//Zona2: Componentes
export default function App() {
    const[screen, setScreen] = useState('menu');

    useEffect(() => {
        if (screen === 'SplashScreen') {
            const timer = setTimeout(() => {
                setScreen('home');
            }, 6000);
            return () => clearTimeout(timer);
        }
    }, [screen]);

    switch(screen){
        case 'tarjetas':
            return <TarjetasScreen/>;
        case 'componente1':
            return <Componente1/>;
        case 'componente4_0':
            return <Componente4_0/>;
        case 'expo1':
            return <Expo1/>;
        case 'PressableEXPO2':
            return <Expo2/>
        case 'Expo2SWITCH':
            return <Expo2SWITCH/>
        case 'FlatListScreen':
            return <FlatListScreen/>
        case 'SectionListScreen':
            return <SectionListScreen/>
        case 'ImagenFondo':
            return <ImagenFondo/>
        case 'SplashScreen':
            return <SplashScreen/>
        case 'home':
            return <Home/>
        case 'PracticaModal':
            return <Componente1/>
        case 'menu':
            default:
            return (
                <View style={styles.container}>
                    <Text>Menu de Praticas</Text>

                    <Button title='Practica Tarjetas' onPress={() => setScreen('tarjetas')}/>
                    <Button title='Practica Componentes' onPress={() => setScreen('componente1')}/> 
                    <Button title="Practica 4" onPress={() => {setScreen('componente4_0');}}/>
                    <Button title="Practica Expo 1" onPress={() => {setScreen('expo1');}}/>
                    <Button title='Practica EXPO 2 - PRESSABLE' onPress={() => setScreen('PressableEXPO2')}/>
                    <Button title='Practica Expo 2 - SWITCH' onPress={() => setScreen('Expo2SWITCH')}/>
                    <Button title='Practica FlatList' onPress={() => setScreen('FlatListScreen')}/>
                    <Button title='Practica SectionList' onPress={() => setScreen('SectionListScreen')}/>
                    <Button title='Practica Imagen de Fondo' onPress={() => setScreen('ImagenFondo')}/>
                    <Button title='Practica SplashScreen' onPress={() => setScreen('SplashScreen')}/>
                    <Button title='Practica Modal y Bottom Sheet' onPress={() => setScreen('PracticaModal')}/>
                    <StatusBar style="auto" />
               
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
    flexDirection: 'column',
  },
});