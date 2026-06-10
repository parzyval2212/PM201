//Zona 1: importación de archivos y componentes.
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image} from 'react-native';
import{Saludo} from './components/Saludo';
import{Saludo2} from './components/Saludo2';
import{Perfil} from './components/Perfil';

//Zona2: Componentes
export default function App() {
  return (
    <View style={styles.container}>
      <Perfil 
        nombre="Cristopher Josue Herrera Marquina" 
        carrera="Ingeniería en Sistemas Computacionales" 
        materia="Programación Móvil" 
        cuatrimestre="9° cuatrimestre" 
      />
      <StatusBar style="auto" />
    </View>
  );
}

//Zona3: Estilos y posicionamiento
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});