//Zona 1: importación de archivos y componentes.
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image} from 'react-native';
import{Saludo} from '../components/Saludo';
import{Perfil} from '../components/Perfil';

//Zona2: Componentes
export default function App() {
  return (
    <View style={styles.container}>
      <Perfil style={styles.tarjetaVerde}
        nombre="Cristopher Josue 1" 
        carrera="Sistemas Computacionales" 
        materia="Programación Móvil" 
        cuatrimestre="9° cuatrimestre" 
      />

      <Perfil style={styles.tarjetaRoja}
        nombre="Cristopher Josue " 
        carrera="Sistemas Computacionales" 
        materia="Programación Móvil" 
        cuatrimestre="9° cuatrimestre" 
      />

      <Perfil style={styles.tarjetaVerde}
        nombre="Cristopher Josue  2" 
        carrera="Sistemas Computacionales" 
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
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  tarjetaVerde:{backgroundColor: 'green'},
  tarjetaRoja:{backgroundColor: 'red'},
});