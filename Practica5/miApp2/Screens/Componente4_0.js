import React, { useState } from 'react';
import { Text, View, TextInput } from 'react-native';

export const Componente4_0 = () => {  

    // State para almacenar el texto del TextInput
    const [texto, setTexto] = useState('');

    return (
        <View>

            <Text>Hola RN: Componente propio</Text>

            <Text>
                Ejemplo de TextInput con State
            </Text>

            <TextInput
                placeholder="Escribe algo..."
                value={texto}
                onChangeText={setTexto}
                maxLength={20}
                autoCapitalize="words"
                secureTextEntry={true}
                style={{
                    borderWidth: 1,
                    padding: 10,
                    marginTop: 10
                }}
            />

            <Text>
                Texto almacenado en State:
            </Text>

            <Text>{texto}</Text>

        </View>
    );
};