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
            {/* href: null mantiene la ruta disponible para router.push, pero no crea una pestaña visible. */}
            <Tabs.Screen
                name="detalles"
                options={{ href: null }}
            />
            {/* Actualizar también se abre desde Detalles, por eso se oculta de la barra inferior. */}
            <Tabs.Screen
                name="actualizar"
                options={{ href: null }}
            />
        </Tabs>
    );
}

// Con tabs agregamos una navegación para las rutas de consulta y alta.
