import {Stack} from 'expo-router';
//Definimos la navegación en pila
export default function RootLayout(){
    return <Stack screenOptions={{ headerShown: false}}/>;
}