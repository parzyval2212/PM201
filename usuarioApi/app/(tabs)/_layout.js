import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#2563EB",
                tabBarInactiveTintColor: "#6B7280",
            }}
        >
            <Tabs.Screen
                name="index"
                options={{ title: "Inicio", href: null }}
            />
            <Tabs.Screen
                name="alta"
                options={{
                    title: "Alta",
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name={focused ? "person-add" : "person-add-outline"}
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="consulta"
                options={{
                    title: "Consulta",
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name={focused ? "people" : "people-outline"}
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="configuracion"
                options={{
                    title: "Configuración",
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name={focused ? "settings" : "settings-outline"}
                            color={color}
                            size={size}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}

// Las pestañas solo contienen Alta y Consulta.
// Detalles y Actualizar se definen en el Stack raíz de app/_layout.js.
