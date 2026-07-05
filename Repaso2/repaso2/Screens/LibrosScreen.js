import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  ActivityIndicator,
  FlatList,
  ImageBackground
} from 'react-native';

import { Libro } from '../components/Libro';

export const LibrosScreen = () => {

  const [splash, setSplash] = useState(true);

useEffect(() => {

    setTimeout(() => {
        setSplash(false);
    }, 2000);

}, []);

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');
  const [contador, setContador] = useState(0);
  const [loading, setLoading] = useState(false);

  const [libros, setLibros] = useState([]);

  const agregarLibro = () => {

    if (titulo == '' || autor == '' || genero == '') {

      Alert.alert(
        'Campos incompletos',
        'Debes llenar todos los campos.'
      );

      return;
    }

    setLoading(true);

    setTimeout(() => {

      const nuevoLibro = {
        id: Date.now().toString(),
        titulo,
        autor,
        genero
      };

      setLibros([...libros, nuevoLibro]);
      setContador(contador + 1);
      setTitulo('');
      setAutor('');
      setGenero('');

      setLoading(false);

      Alert.alert(
        'Correcto',
        'Libro agregado correctamente.'
      );

    }, 4000);

  };

  if (splash) {

    return (

        <View style={styles.splash}>

            <Text style={styles.tituloSplash}>
                Registro de Libros
            </Text>

            <ActivityIndicator
                size="large"
                color="blue"
            />

            <Text>Cargando...</Text>

        </View>

    );

  }

  return (

    <ImageBackground
      source={require('../assets/Libros.jpg')}
      style={styles.fondo}
      resizeMode="cover"
    >

      <View style={styles.container}>
        
        <Text style={styles.titulo}>
          Registro de Libros
        </Text>

        <TextInput
          placeholder="Título del libro"
          value={titulo}
          onChangeText={setTitulo}
          style={styles.input}
        />

        <TextInput
          placeholder="Autor"
          value={autor}
          onChangeText={setAutor}
          style={styles.input}
        />

        <TextInput
          placeholder="Género"
          value={genero}
          onChangeText={setGenero}
          style={styles.input}
        />

        <Pressable
          style={styles.boton}
          onPress={agregarLibro}
        >

          <Text style={styles.textoBoton}>
            Agregar Libro
          </Text>

        </Pressable>

        {
          loading &&
          <ActivityIndicator
            size="large"
            color="blue"
          />
        }
        <Text style={{ color: '#ffffff' }}>
            Total de libros: {contador}
        </Text>
        <FlatList
          data={libros}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (

            <Libro
              titulo={item.titulo}
              autor={item.autor}
              genero={item.genero}
            />

          )}
        />

      </View>

    </ImageBackground>

  );

};

const styles = StyleSheet.create({

  fondo: {
    flex: 1,
    opacity: 1
  },

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255,255,255)'
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },

  input: {
    borderWidth: 1,
    borderColor: '#999',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15
  },

  boton: {
    backgroundColor: '#1976D2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20
  },

  textoBoton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  splash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    },

  tituloSplash: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 20
    },

});