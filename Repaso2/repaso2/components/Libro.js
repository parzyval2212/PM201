import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const Libro = ({ titulo, autor, genero }) => {
  return (
    <View style={styles.card}>

      <Text style={styles.titulo}>{titulo}</Text>

      <Text>Autor: {autor}</Text>

      <Text>Género: {genero}</Text>

    </View>
  );
};

const styles = StyleSheet.create({

  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 3
  },

  titulo: {
    fontSize: 18,
    fontWeight: 'bold'
  }

});