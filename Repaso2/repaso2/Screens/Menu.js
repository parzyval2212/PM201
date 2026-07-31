//Zona 1: importación de archivos y componentes.
import { StatusBar } from 'expo-status-bar';
import React, {useState } from 'react';
import { StyleSheet, Text, View, Image, Button} from 'react-native';
import TarjetasScreen from './TarjetasScreen';


//Zona2: Componentes
export default function App() {
    const[screen, setScreen] = useState('menu');

    switch(screen){
        case 'tarjetas':
            return <TarjetasScreen/>;
      
        case 'menu':
            default:
            return (
                <View style={styles.container}>
                    <Text>Menu de Praticas</Text>
                    <Button title='Visualizar tarjetas de platillo' onPress={() => setScreen('tarjetas')}/>
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