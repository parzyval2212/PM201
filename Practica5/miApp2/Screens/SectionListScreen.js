import React, { useState } from 'react';
import { Text, View, StyleSheet, SectionList } from 'react-native';

export const SectionListScreen = () => {  
    const datos = [
        {
            title: 'INGERNIERIA EN SISTEMAS',
            data:[
                {nombre: 'Cristopher'},
                {nombre: 'Juan'},
            ]
        },
        {
            title: 'ADMINISTRACION',
            data:[
                {nombre: 'JOSUE'},
                {nombre: 'Roman'},
            ]
        },
        
    ];


  return (
    <View style={styles.container}>
        <Text style={styles.title}> 
            Lista de Estudiantes por carrera :D 
        </Text>
        <SectionList
            sections={datos}
            renderSectionHeader={({section}) => (
                <Text style={styles.sectionHeader}>{section.title}</Text>
            )}
            renderItem={({item}) => (
                <Text style={styles.item}>{item.nombre}</Text>
            )}
            keyExtractor={(item, index) => index.toString()}
        />
    </View>
  );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20
    },

    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: '#f0f0f0',
        padding: 10
    },

    item: {
        fontSize: 16,
        padding: 10
    },

    card: {
        backgroundColor: '#d4f1f4',
        padding: 15,
        margin: 10,
        borderRadius: 10
    }

});
