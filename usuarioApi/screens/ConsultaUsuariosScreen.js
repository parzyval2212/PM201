import {SafeAreaView,View,Text,FlatList,StyleSheet,Pressable} from 'react-native';
import React, {useCallback, useState} from 'react';
// router permite cambiar de pantalla mediante las rutas creadas dentro de la carpeta app.
// useFocusEffect se ejecuta cada vez que esta pantalla vuelve a estar visible.
import { router, useFocusEffect } from 'expo-router';
import { obtenerUrlUsuarios } from '../services/apiConfig';
export default function ConsultaUsuariosScreen() {

  const[ usuarios, setUsuarios] = useState([]);
  // useCallback conserva esta función entre renderizados para poder usarla como dependencia.
  const obtenerUsuarios = useCallback(async () => {
    try{
      const respuesta=await fetch(await obtenerUrlUsuarios('/'));
      const datos= await respuesta.json();
      console.log('Respuesta API', datos);

      setUsuarios(datos.usuarios); //Dame los datos pero solo muestra lo que esta en usuarios

    }catch(error){
      console.log('Error API: ', error);
    }
  }, []);

  // A diferencia de useEffect(..., []), este efecto corre cada vez que se regresa a Consulta.
  // Así, después de guardar una actualización o eliminar un usuario, la lista se vuelve a pedir a la API.
  useFocusEffect(
    useCallback(() => {
      obtenerUsuarios();
    }, [obtenerUsuarios])
  );

  //agregar la opcion de "ver detalles" para cada usuario, que al hacer click abra un enlace a una pagina web con mas informacion del usuario, enviando el id.
  // FlatList llama esta función una vez por cada elemento de usuarios.
  // item representa al usuario actual que se está dibujando en una tarjeta.
  const renderTarjeta = ({ item }) => (
    <View style={styles.card}>

      <Text style={styles.nombre}>{item.nombre}</Text>

      <View style={styles.linea}></View>

        <Text style={styles.info}>
          Edad: {item.edad} años
        </Text>
        {/* Pressable convierte el texto "Ver detalles" en una zona que responde al toque o clic. */}
        {/* onPress se ejecuta solamente cuando el usuario pulsa esta tarjeta de detalles. */}
        <Pressable
            onPress={() =>
              // router.push agrega una nueva pantalla al historial de navegación.
              // Por eso luego router.back() puede regresar desde detalles hasta esta consulta.
              router.push({
                // pathname indica la ruta destino. app/(tabs)/detalles.js se consulta como /detalles;
                // el nombre del grupo (tabs) sirve para organizar archivos y no aparece en la URL.
                pathname: "/detalles",
                // params son valores que viajan junto con la ruta como parámetros de búsqueda.
                params: {
                  // item.id es el id del usuario de esta tarjeta. Expo Router lo transforma en:
                  // /detalles?id=4 (el 4 cambia por el id real del usuario seleccionado).
                  // DetallesUsuariosScreen lo recupera usando useLocalSearchParams().
                  id: item.id,
                },
              })
            }
        >
            <Text style={styles.botonTexto}>
              Ver detalles
            </Text>
        </Pressable>
      </View>
  );

  return (

    <SafeAreaView style={styles.container}>

      <Text style={styles.titulo}>
        Lista de Usuarios
      </Text>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderTarjeta}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

    </SafeAreaView>
  );
  
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1F2937',
    marginBottom: 20,
  },

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

  nombre: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
  },

  linea: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 10,
  },

  info: {
    fontSize: 16,
    color: '#4B5563',
  },

  botonTexto: {
    color: '#2563EB',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 14,
  },

});
