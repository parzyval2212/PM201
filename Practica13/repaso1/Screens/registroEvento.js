import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {View,Text,TextInput,StyleSheet,Button,Switch,Alert,Platform} from 'react-native';

// Parche para que Alert funcione en Web
if (Platform.OS === "web") {
  Alert.alert = (titulo, mensaje) => {
    window.alert(titulo + (mensaje ? "\n\n" + mensaje : ""));
  };
}

export const RegistroEvento = () => {

  const [nombre, setNombre] = useState('');
  const [carrera, setCarrera] = useState('');
  const [semestre, setSemestre] = useState('');

  const [taller, setTaller] = useState(false);
  const [constancia, setConstancia] = useState(false);
  const [deportes, setDeportes] = useState(false);

  const enviarRegistro = () => {

    // Validar campos vacíos
    if (nombre === '' || carrera === '' || semestre === '') {
      Alert.alert(
        "Campos incompletos",
        "Debes llenar todos los campos."
      );
      return;
    }

    // Validar que semestre sea numérico
    if (isNaN(semestre)) {
      Alert.alert(
        "Error",
        "El semestre debe ser un número."
      );
      return;
    }

    Alert.alert(
      "Registro enviado",
      "Nombre: " + nombre +
      "\nCarrera: " + carrera +
      "\nSemestre: " + semestre +
      "\n\nTaller: " + (taller ? "Sí" : "No") +
      "\nConstancia: " + (constancia ? "Sí" : "No") +
      "\nDeportes: " + (deportes ? "Sí" : "No")
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
        
      <Text style={styles.titulo}>Registro de Evento Universitario</Text>

      <TextInput
        placeholder="Nombre completo"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />

      <TextInput
        placeholder="Carrera"
        value={carrera}
        onChangeText={setCarrera}
        style={styles.input}
      />

      <TextInput
        placeholder="Semestre"
        value={semestre}
        onChangeText={setSemestre}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.subtitulo}>Opciones</Text>

      <View style={styles.opcion}>
        <Text style={styles.texto}>¿Asistirá al taller?</Text>
        <Switch
          value={taller}
          onValueChange={setTaller}
        />
      </View>

      <View style={styles.opcion}>
        <Text style={styles.texto}>¿Requiere constancia?</Text>
        <Switch
          value={constancia}
          onValueChange={setConstancia}
        />
      </View>

      <View style={styles.opcion}>
        <Text style={styles.texto}>¿Participará en deportes?</Text>
        <Switch
          value={deportes}
          onValueChange={setDeportes}
        />
      </View>

      <Button
        title="Enviar Registro"
        onPress={enviarRegistro}
      />

    </View>
  );
};


//Puedes modificar los colores para que se vea mejor autoacompletado?
const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#244666fd',
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff'
  },

  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#fff'
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    color: '#fff',
    backgroundColor: '#3a5f7d',
  },

  opcion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    color: '#fff'
  },

  texto: {
    color: '#fff'
  }

});