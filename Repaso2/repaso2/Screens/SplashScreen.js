import React, { useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet
} from 'react-native';

export const SplashScreen = ({ navigation }) => {

  useEffect(() => {

    setTimeout(() => {
      navigation.replace("Libros");
    }, 2000);

  }, []);

  return (

    <View style={styles.container}>

      <Text style={styles.titulo}>
        Registro de Libros
      </Text>

      <ActivityIndicator
        size="large"
        color="blue"
      />

      <Text>Cargando...</Text>

    </View>

  );

};

const styles = StyleSheet.create({

  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },

  titulo:{
    fontSize:28,
    fontWeight:'bold',
    marginBottom:30
  }

});