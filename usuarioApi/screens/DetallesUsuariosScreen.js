// Componentes visuales de React Native usados para construir la pantalla.
// Pressable detecta toques/clics; StyleSheet organiza los estilos al final.
import {SafeAreaView,View,Text,StyleSheet, Pressable} from 'react-native';
// useState guarda datos que pueden cambiar; useEffect ejecuta código al cargar la pantalla.
import React, {useState, useEffect} from 'react';
// useLocalSearchParams lee el id enviado desde Consulta; router permite volver atrás.
import { router, useLocalSearchParams } from 'expo-router';

// Centraliza la URL para no repetirla en las solicitudes GET y DELETE.
const API_URL = 'http://192.168.100.6:5000/v1/usuarios';

// Credenciales indicadas para la práctica. El backend las requiere en PUT y DELETE.
const encabezadosAutorizacion = () => ({
    Authorization: `Basic ${btoa('admin:1234')}`,
});

export default function DetallesUsuariosScreen() {
    //mostrar los detalles de un usuario en particular, para eso se necesita el id del usuario, que se obtiene de la ruta de la pantalla anterior.
    // Extraemos el parámetro id de la URL, por ejemplo: /detalles?id=4.
    const { id } = useLocalSearchParams();
    // usuario guarda el objeto encontrado. Empieza vacío porque el fetch aún no termina.
    const[ usuario, setUsuario] = useState({});
    // cargando controla el mensaje temporal mientras se consulta la API.
    const [cargando, setCargando] = useState(true);
    // error almacena un texto entendible para mostrar fallas en pantalla.
    const [error, setError] = useState('');
    // Deshabilita el botón mientras DELETE está en proceso y evita solicitudes duplicadas.
    const [eliminando, setEliminando] = useState(false);

    // Esta función consulta todos los usuarios y selecciona solamente el que coincide con id.
    // Se usa GET /usuarios/ porque el backend actual no tiene GET /usuarios/{id}.
    const obtenerUsuario = async () => {
        try {
            // Antes de iniciar la petición se activa el estado de carga y se limpia un error anterior.
            setCargando(true);
            setError('');

            // fetch realiza una petición HTTP GET. Al no indicar method, GET es el valor predeterminado.
            const respuesta = await fetch(
                `${API_URL}/`
            );

            // respuesta.ok es false cuando el servidor responde con un estado de error, como 404 o 500.
            if (!respuesta.ok) {
                // Se crea un error para que el catch muestre el mensaje correspondiente.
                throw new Error(`Error HTTP: ${respuesta.status}`);
            }

            // Convierte el cuerpo JSON de la respuesta a un objeto de JavaScript.
            const datos = await respuesta.json();
            // find recorre datos.usuarios y devuelve el primer usuario cuyo id coincide.
            // String(...) evita que falle la comparación si un id es número y el otro llega como texto desde la URL.
            const usuarioEncontrado = datos.usuarios.find(
                (usuarioActual) => String(usuarioActual.id) === String(id)
            );

            // Si find no encontró coincidencia, devuelve undefined; aquí se evita mostrar datos vacíos sin explicación.
            if (!usuarioEncontrado) {
                setError('No se encontró el usuario.');
                // return detiene esta función; así no se intenta guardar un usuario inexistente.
                return;
            }

            // Guarda el usuario encontrado. React vuelve a renderizar y muestra nombre, id y edad.
            setUsuario(usuarioEncontrado);
        } catch (error) {
            // catch recibe errores de red, de JSON o los errores lanzados arriba.
            console.log('Error al obtener detalle:', error);
            // El estado error hace que el JSX muestre este mensaje al usuario.
            setError('No fue posible cargar el usuario.');
        } finally {
            // finally se ejecuta tanto si la petición funciona como si falla.
            // Por eso siempre se apaga el indicador de carga.
            setCargando(false);
        }
    };

    // useEffect se ejecuta cuando se abre esta pantalla y también si cambia el id.
    // [id] es la lista de dependencias: evita ejecutar la consulta en cada renderizado.
    useEffect(() => {
        obtenerUsuario();
    }, [id]);

    // Elimina el usuario que corresponde al id recibido en los parámetros de la ruta.
    const eliminarUsuario = async () => {
        try {
            // Cambia el texto del botón a "Eliminando..." y limpia mensajes anteriores.
            setEliminando(true);
            setError('');

            // DELETE pide al backend borrar el recurso /v1/usuarios/{id}.
            // headers agrega Authorization porque esta ruta está protegida por HTTP Basic.
            const respuesta = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE',
                headers: encabezadosAutorizacion(),
            });

            // Si FastAPI responde 401, 404, 422 o 500, se obtiene el texto de detail para el error.
            if (!respuesta.ok) {
                const datosError = await respuesta.json().catch(() => ({}));
                throw new Error(datosError.detail || `Error HTTP: ${respuesta.status}`);
            }

            // replace sustituye Detalles por Consulta: al borrar no tiene sentido volver al usuario eliminado.
            router.replace('/consulta');
        } catch (error) {
            // Se muestra el error del servidor o de red sin cerrar la pantalla abruptamente.
            console.error('Error al eliminar usuario:', error);
            setError(`No fue posible eliminar el usuario: ${error.message}`);
        } finally {
            // Reactiva el botón incluso si la eliminación falló.
            setEliminando(false);
        }
    };
    
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.titulo}>
                    Detalles del Usuario
                </Text>
                {/* Se muestra una sola de estas tres opciones: carga, error o los datos del usuario. */}
                {cargando ? (
                    /* Mientras fetch está activo, usuario todavía puede ser un objeto vacío. */
                    <Text style={styles.info}>Cargando usuario...</Text>
                ) : error ? (
                    /* Si obtenerUsuario guardó un error, se prioriza este mensaje. */
                    <Text style={styles.error}>{error}</Text>
                ) : (
                    /* <>...</> es un Fragment: agrupa elementos sin agregar otra View. */
                    <>
                        {/* Muestra propiedades del objeto encontrado y guardado en el estado usuario. */}
                        <Text style={styles.nombre}>{usuario.nombre}</Text>
                        <View style={styles.linea}></View>
                        <Text style={styles.info}>ID: {usuario.id}</Text>
                        <Text style={styles.info}>Edad: {usuario.edad} años</Text>
                        
                        {/* Este Pressable ejecuta la eliminación al pulsar "Eliminar usuario". */}
                        {/* La función se pasa sin paréntesis para que se ejecute solo al pulsar. */}
                        {/* disabled bloquea pulsaciones durante la petición DELETE. */}
                        <Pressable
                            style={styles.botonEliminar}
                            onPress={eliminarUsuario}
                            disabled={eliminando}
                        >
                            {/* En React Native el texto visible debe ir dentro del componente Text. */}
                            <Text style={styles.textoBoton}>{eliminando ? 'Eliminando...' : 'Eliminar usuario'}</Text>
                        </Pressable>
                        {/* Navega a Actualizar y envía el id; la siguiente pantalla cargará sus campos actuales. */}
                        <Pressable
                            style={styles.botonActualizar}
                            onPress={() => router.push({ pathname: '/actualizar', params: { id } })}
                        >
                            <Text style={styles.textoBoton}>Actualizar usuario</Text>
                        </Pressable>
                        {/* router.back() vuelve a la pantalla desde la cual se navegó aquí. */}
                        <Pressable style={styles.botonRegresar} onPress={() => router.back()}>
                            <Text style={styles.textoBoton}>Regresar a consulta</Text>
                        </Pressable>
                    </>
                )}
            </View>
        </SafeAreaView>
    );
}

//estilos
// StyleSheet.create agrupa estilos y permite reutilizarlos mediante styles.nombreDelEstilo.
const styles = StyleSheet.create({

  // Ocupa toda la pantalla y agrega un margen interno alrededor de la tarjeta.
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },

  // Estilo del encabezado "Detalles del Usuario".
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1F2937',
    marginBottom: 20,
  },

  // Tarjeta blanca donde se dibuja el detalle del usuario.
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    elevation: 4,

    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  // Destaca el nombre con color azul y tamaño mayor.
  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
  },

  // Línea visual que separa el nombre del resto de la información.
  linea: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 10,
  },

  // Estilo compartido para id, edad y el estado de carga.
  info: {
    fontSize: 16,
    color: '#4B5563',
  },

  // Texto rojo para avisos de error.
  error: {
    fontSize: 16,
    color: '#DC2626',
  },

  // Contenedor azul del botón para regresar a la consulta.
  botonRegresar: {
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },

  botonEliminar: {
    backgroundColor: '#DC2626',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },

  // Botón naranja que abre el formulario de edición.
  botonActualizar: {
    backgroundColor: '#D97706',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },

  // Texto blanco mostrado dentro del botón de regresar.
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

});
