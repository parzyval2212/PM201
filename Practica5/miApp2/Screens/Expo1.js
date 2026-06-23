import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, Button} from 'react-native';

export const Expo1 = () => {  

    const [tareas, setTareas] = useState([
        'Ir al gimnasio',
        'Asistir a clases',
        'Pasar lista en el charlees',
        'Ver a la novia',
        'Dormir temprano'
    ]);

    const agregarTarea = () => {
        setTareas([...tareas, `Nueva tarea ${tareas.length + 1}`]);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Button title="Agregar tarea" onPress={agregarTarea} />
            <ScrollView contentContainerStyle={{ padding: 30 }}>
                {tareas.map((tarea, index) => (
                    <View key={index} style={{ marginBottom: 10, 
                                               padding: 15, 
                                               backgroundColor: '#244666fd' 
                                            }}>
                        <Text>{tarea}</Text>
                    </View>
                ))}  
            </ScrollView>
        </SafeAreaView>
    )
}
