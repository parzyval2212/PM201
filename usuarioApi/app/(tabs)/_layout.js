import {Tabs} from "expo-router";

//import {IonIcons} from "@expo/vector-icons";
export default function TabsLayout (){
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{title: "Inicio", href:null }}/>
            <Tabs.Screen name="alta" options={{title :"Alta" /*tabBarIcon*/}}/>
            <Tabs.Screen name="consulta" options={{title: "Consulta" }}/>
        </Tabs>
    );
}

//Con tabs agregamos una nueva navegacion de la navegacion
//ruta de consulta y alta ven hacia la de raiz