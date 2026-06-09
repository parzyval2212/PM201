
//ZONA1> Importacion de archivos y componentes
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import {Saludo} from './components/Saludo';
import {Saludo2} from './components/Saludo2';
//ZONA2> Main -Componentes
export default function App() {
  return (  

    <View style={styles.container}>
      <Image source={require('./assets/wave.png')} />
      <Text>-----------------------------------</Text>
      <Saludo/>
      <Text>-----------------------------------</Text>
      <Saludo2/>
      <Text>Hola Mundo React Native</Text>
      <StatusBar style="auto" />

    </View>

  );
}
//ZONA3> Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
