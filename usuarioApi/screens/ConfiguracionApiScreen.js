import React, { useEffect, useState } from 'react';
import { Alert, Platform, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import {
  guardarIpApi,
  IP_PREDETERMINADA,
  obtenerIpApi,
  obtenerUrlUsuarios,
  PUERTO_API,
  restaurarIpApi,
} from '../services/apiConfig';

export default function ConfiguracionApiScreen() {
  const [ip, setIp] = useState(IP_PREDETERMINADA);
  const [guardando, setGuardando] = useState(false);
  const [probando, setProbando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    obtenerIpApi().then(setIp).catch(() => setMensaje('No fue posible leer la configuración.'));
  }, []);

  const avisar = (titulo, texto) => {
    if (Platform.OS === 'web') window.alert(`${titulo}\n\n${texto}`);
    else Alert.alert(titulo, texto);
  };

  const guardar = async () => {
    try {
      setGuardando(true);
      setMensaje('');
      const ipGuardada = await guardarIpApi(ip);
      setIp(ipGuardada);
      avisar('Configuración guardada', `La API usará http://${ipGuardada}:${PUERTO_API}`);
    } catch (error) {
      setMensaje(error.message);
    } finally {
      setGuardando(false);
    }
  };

  const probarConexion = async () => {
    try {
      setProbando(true);
      setMensaje('');
      await guardarIpApi(ip);
      const url = await obtenerUrlUsuarios('/');
      const respuesta = await fetch(url);
      if (!respuesta.ok) throw new Error(`La API respondió con HTTP ${respuesta.status}.`);
      setMensaje('Conexión correcta con la API.');
    } catch (error) {
      setMensaje(`No fue posible conectar: ${error.message}`);
    } finally {
      setProbando(false);
    }
  };

  const restaurar = async () => {
    const ipInicial = await restaurarIpApi();
    setIp(ipInicial);
    setMensaje('Se restauró la IP predeterminada.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Configuración de la API</Text>
        <Text style={styles.etiqueta}>Dirección IPv4 del servidor</Text>
        <TextInput
          style={styles.input}
          value={ip}
          onChangeText={setIp}
          placeholder="192.168.1.10"
          keyboardType="numbers-and-punctuation"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={styles.url}>Puerto fijo: {PUERTO_API}</Text>
        {mensaje ? <Text style={styles.mensaje}>{mensaje}</Text> : null}
        <Pressable style={styles.botonGuardar} onPress={guardar} disabled={guardando || probando}>
          <Text style={styles.textoBoton}>{guardando ? 'Guardando...' : 'Guardar IP'}</Text>
        </Pressable>
        <Pressable style={styles.botonProbar} onPress={probarConexion} disabled={guardando || probando}>
          <Text style={styles.textoBoton}>{probando ? 'Probando...' : 'Guardar y probar conexión'}</Text>
        </Pressable>
        <Pressable style={styles.botonRestaurar} onPress={restaurar} disabled={guardando || probando}>
          <Text style={styles.textoRestaurar}>Restaurar valor predeterminado</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FA', padding: 20, justifyContent: 'center' },
  card: { backgroundColor: '#FFFFFF', borderRadius: 15, padding: 22, elevation: 4 },
  titulo: { fontSize: 25, fontWeight: 'bold', textAlign: 'center', color: '#1F2937', marginBottom: 24 },
  etiqueta: { fontSize: 16, fontWeight: 'bold', color: '#374151', marginBottom: 8 },
  input: { height: 50, borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 10, paddingHorizontal: 14, fontSize: 17 },
  url: { color: '#6B7280', marginTop: 8, marginBottom: 12 },
  mensaje: { color: '#1F2937', fontSize: 15, marginBottom: 12 },
  botonGuardar: { backgroundColor: '#2563EB', paddingVertical: 14, borderRadius: 10, alignItems: 'center' },
  botonProbar: { backgroundColor: '#059669', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginTop: 12 },
  botonRestaurar: { paddingVertical: 13, alignItems: 'center', marginTop: 6 },
  textoBoton: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  textoRestaurar: { color: '#2563EB', fontSize: 15, fontWeight: 'bold' },
});
