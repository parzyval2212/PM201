// useState almacena los valores escritos; useEffect carga el usuario al abrir la pantalla.
import React, { useEffect, useState } from 'react';
// TextInput permite editar nombre y edad; Alert muestra mensajes en Android/iOS.
import { Alert, Platform, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
// useLocalSearchParams recibe el id; router permite regresar a Consulta tras guardar.
import { router, useLocalSearchParams } from 'expo-router';
import { obtenerUrlUsuarios } from '../services/apiConfig';

// PUT requiere las mismas credenciales Basic que DELETE en el backend de la práctica.
const encabezadosAutorizacion = () => ({
    Authorization: `Basic ${btoa('admin:1234')}`,
    'Content-Type': 'application/json',
});

export default function ActualizarUsuariosScreen() {
    // Este id fue enviado al pulsar "Actualizar usuario" desde la pantalla de detalles.
    const { id } = useLocalSearchParams();
    // Estos estados alimentan los value de los dos TextInput: son campos controlados por React.
    const [nombre, setNombre] = useState('');
    const [edad, setEdad] = useState('');
    // cargando es true mientras se buscan los valores existentes; guardando mientras se envía PUT.
    const [cargando, setCargando] = useState(true);
    const [guardando, setGuardando] = useState(false);
    // error contiene un mensaje visible para problemas de lectura, validación o guardado.
    const [error, setError] = useState('');

    // Obtiene la lista pública y localiza al usuario que corresponde a id para llenar los campos.
    const cargarUsuario = async () => {
        try {
            setCargando(true);
            setError('');

            // GET es el método predeterminado de fetch; esta ruta no necesita autenticación.
            const respuesta = await fetch(await obtenerUrlUsuarios('/'));
            if (!respuesta.ok) {
                throw new Error(`Error HTTP: ${respuesta.status}`);
            }

            // Se convierte la respuesta JSON y find selecciona únicamente el usuario que se editará.
            const datos = await respuesta.json();
            const usuario = datos.usuarios.find(
                (usuarioActual) => String(usuarioActual.id) === String(id)
            );

            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }

            // Los valores iniciales se copian a estado para que aparezcan dentro de los TextInput.
            setNombre(usuario.nombre);
            setEdad(String(usuario.edad));
        } catch (error) {
            setError(`No fue posible cargar el usuario: ${error.message}`);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        // Cada vez que cambia id, se vuelve a cargar el usuario correspondiente.
        cargarUsuario();
    }, [id]);

    // Alert no se comporta igual en web; por eso web usa window.alert y móvil usa Alert.alert.
    const mostrarMensaje = (titulo, mensaje) => {
        if (Platform.OS === 'web') {
            window.alert(`${titulo}\n\n${mensaje}`);
        } else {
            Alert.alert(titulo, mensaje);
        }
    };

    // Valida los campos y luego actualiza el registro seleccionado mediante PUT.
    const guardarCambios = async () => {
        if (!nombre.trim() || !edad.trim()) {
            setError('Nombre y edad son obligatorios.');
            return;
        }

        try {
            setGuardando(true);
            setError('');

            // PUT envía el objeto completo con nombre y edad, y Basic Auth autoriza el cambio.
            const respuesta = await fetch(await obtenerUrlUsuarios(`/${id}`), {
                method: 'PUT',
                headers: encabezadosAutorizacion(),
                // JSON.stringify convierte el objeto de JavaScript en el cuerpo JSON de la petición.
                body: JSON.stringify({ nombre: nombre.trim(), edad: Number(edad) }),
            });

            if (!respuesta.ok) {
                const datosError = await respuesta.json().catch(() => ({}));
                throw new Error(datosError.detail || `Error HTTP: ${respuesta.status}`);
            }

            // Si no hubo error, se avisa al usuario y se vuelve a la lista ya actualizada.
            mostrarMensaje('Éxito', 'Usuario actualizado correctamente.');
            router.replace('/consulta');
        } catch (error) {
            setError(`No fue posible actualizar el usuario: ${error.message}`);
        } finally {
            setGuardando(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.titulo}>Actualizar usuario</Text>
                {cargando ? (
                    <Text style={styles.info}>Cargando datos...</Text>
                ) : (
                    <>
                        <Text style={styles.etiqueta}>Nombre</Text>
                        {/* value toma el estado y onChangeText lo actualiza con cada letra escrita. */}
                        <TextInput
                            style={styles.input}
                            value={nombre}
                            onChangeText={setNombre}
                            placeholder="Nombre del usuario"
                        />
                        <Text style={styles.etiqueta}>Edad</Text>
                        {/* La edad se guarda como texto mientras se edita y se vuelve Number al hacer PUT. */}
                        <TextInput
                            style={styles.input}
                            value={edad}
                            onChangeText={setEdad}
                            placeholder="Edad del usuario"
                            keyboardType="numeric"
                        />
                        {/* Si error no está vacío, se dibuja; si está vacío, no se renderiza nada. */}
                        {error ? <Text style={styles.error}>{error}</Text> : null}
                        {/* disabled evita enviar dos solicitudes PUT si el usuario toca rápido el botón. */}
                        <Pressable style={styles.botonGuardar} onPress={guardarCambios} disabled={guardando}>
                            <Text style={styles.textoBoton}>{guardando ? 'Guardando...' : 'Guardar cambios'}</Text>
                        </Pressable>
                        <Pressable style={styles.botonCancelar} onPress={() => router.back()}>
                            <Text style={styles.textoBoton}>Cancelar</Text>
                        </Pressable>
                    </>
                )}
            </View>
        </SafeAreaView>
    );
}

// Los estilos de esta pantalla se agrupan en un objeto para reutilizarlos con styles.nombre.
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F7FA', padding: 20, justifyContent: 'center' },
    card: { backgroundColor: '#FFFFFF', borderRadius: 15, padding: 22, elevation: 4 },
    titulo: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', color: '#1F2937', marginBottom: 22 },
    etiqueta: { fontSize: 16, fontWeight: 'bold', color: '#374151', marginBottom: 7 },
    input: { height: 50, borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 10, paddingHorizontal: 14, marginBottom: 16, fontSize: 16 },
    info: { fontSize: 16, color: '#4B5563', textAlign: 'center' },
    error: { fontSize: 15, color: '#DC2626', marginBottom: 12 },
    botonGuardar: { backgroundColor: '#D97706', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginTop: 4 },
    botonCancelar: { backgroundColor: '#2563EB', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginTop: 12 },
    textoBoton: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});
