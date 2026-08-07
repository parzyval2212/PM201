import {Stack} from 'expo-router';
//Definimos la navegación en pila
export default function RootLayout(){
    return (
        <Stack>
            {/* Las pestañas no necesitan encabezado porque ya tienen su barra inferior. */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            {/* Estas pantallas sí muestran el header nativo con título y flecha de regreso. */}
            <Stack.Screen name="detalles" options={{ title: 'Detalle del usuario' }} />
            <Stack.Screen name="actualizar" options={{ title: 'Actualizar Usuario' }} />
        </Stack>
    );
}
