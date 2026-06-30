import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet,FlatList } from 'react-native';

import{Estudiante} from '../components/Estudiante';

export const FlatListScreen = () => {  
    const estudiantes = [
        {id: '1', nombre: 'Juan', carrera: 'ISC'},
        {id: '2', nombre: 'María', carrera: 'ISC'},
        {id: '3', nombre: 'Pedro', carrera: 'ISC'},
    ];


  return (
    <View style={styles.container}>
        <Text style={styles.title}> 
            Lista de Estudiantes :D 
        </Text>

        <FlatList
            data={estudiantes}
            renderItem={({item}) => (
                <Estudiante
                    nombre={item.nombre}    
                    carrera={item.carrera}
                />
            )}
            keyExtractor={(item) => item.id}
        />


    </View>
  );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
        content: 'center',
        backgroundColor: '#2a2255',
    },

    titulo: {
        fontSize: 25,
        fontWeight: 'bold'
    },

    card: {
        backgroundColor: '#d4f1f4',
        padding: 15,
        margin: 10,
        borderRadius: 10
    }

});
