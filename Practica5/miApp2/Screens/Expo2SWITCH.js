import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch} from 'react-native';

export const Expo2SWITCH = () => {
    const [encendido, setEncendido] = useState(false);

    return(
        <View style={[styles.container,{backgroundColor: encendido ? 'black' : 'white'}]}>

            <Text style={{color: encendido ? 'white' : 'black'}}>
                {
                    encendido ? 'Modo Oscuro activado' : 'Modo Oscuro Desactivado'
                }
            </Text>
            <Switch 
                value={encendido}
                onValueChange={setEncendido}
                trackColor={{
                    false: '#767577',
                    true: '#81b0ff'
                }}
                thumbColor={encendido ? '#2196f3':'#f4f3f4'}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});