# Práctica No. 22: APK e instalación en Android

## Objetivo

Generar una versión instalable para Android de la aplicación de usuarios desarrollada en la práctica 21. La aplicación móvil se encuentra en `usuarioApi`; el servidor FastAPI se encuentra en `miAPI` y debe permanecer encendido y accesible desde el teléfono.

## Preparación realizada

- Nombre visible: **Usuario API**.
- Identificador Android: `com.pm201.usuarioapi`.
- Tráfico HTTP local habilitado para conectar con `miAPI` en la red de la práctica.
- Ícono: `assets/usuario-icon.png`.
- Splash Screen: fondo `#F5F7FA`, imagen centrada y ancho de 200 px.
- Perfil `preview`: genera un APK instalable.
- Perfil `production`: genera un AAB para Google Play.
- La pestaña **Configuración** permite escribir la IPv4 del equipo que ejecuta `miAPI`.

La configuración visual está en `app.json` y los perfiles de compilación están en `eas.json`.

## Procedimiento para generar el APK

Desde una terminal, entrar en la aplicación:

```powershell
cd usuarioApi
```

Instalar EAS CLI globalmente (solo es necesario una vez):

```powershell
npm install --global eas-cli
```

También se puede ejecutar sin instalación global usando `npx eas-cli` en lugar de `eas`.

Crear una cuenta en [expo.dev/signup](https://expo.dev/signup), iniciar sesión y verificar la cuenta:

```powershell
eas login
eas whoami
```

Vincular/configurar el proyecto. En el primer uso, EAS puede pedir crear el proyecto remoto y agregará `extra.eas.projectId` a `app.json`:

```powershell
eas build:configure
```

Generar el APK con el perfil preparado:

```powershell
eas build --platform android --profile preview
```

Al finalizar, EAS muestra una URL y un código QR. Abrir la URL en el teléfono Android, descargar el APK y aceptar la instalación. Si Android lo solicita, permitir temporalmente **Instalar aplicaciones desconocidas** para el navegador o administrador de archivos utilizado. Después se puede desactivar nuevamente ese permiso.

Antes de probar la aplicación, el teléfono y el equipo que ejecuta `miAPI` deben estar en la misma red. Se inicia el backend desde la carpeta raíz con el procedimiento de la práctica 21 y, dentro de la aplicación, se guarda la IPv4 del equipo en **Configuración**. No se debe usar `localhost`, porque en el teléfono se refiere al propio dispositivo.

## Cuestionario

### a) ¿Qué es Expo Application Services (EAS)?

Es el conjunto de servicios en la nube y herramientas de Expo para crear, enviar y actualizar aplicaciones. EAS Build compila los binarios nativos de Android e iOS sin exigir que el equipo local tenga todo el entorno nativo instalado. [Documentación oficial de EAS](https://docs.expo.dev/eas/)

### b) ¿Qué diferencia existe entre Expo Go y un APK?

Expo Go es una aplicación de desarrollo ya construida que abre proyectos Expo durante las pruebas y solamente incluye un conjunto predeterminado de módulos nativos. Un APK es el binario Android de una aplicación concreta: se instala con su propio nombre, ícono, configuración y código nativo, y puede ejecutarse sin Expo Go. [Introducción a los development builds](https://docs.expo.dev/develop/development-builds/introduction/)

### c) ¿Qué es EAS CLI y cómo se instala?

EAS CLI es la interfaz de línea de comandos para utilizar servicios como EAS Build. Se instala con `npm install --global eas-cli`; Expo también permite ejecutar la versión más reciente mediante `npx eas-cli@latest`. [Instalación de EAS CLI](https://docs.expo.dev/build/setup/)

### d) ¿Cómo crear una cuenta en Expo?

Se abre [expo.dev/signup](https://expo.dev/signup), se registran los datos solicitados y se verifica la cuenta. La cuenta identifica al propietario de los proyectos y compilaciones en EAS.

### e) ¿Cómo iniciar sesión desde la terminal?

Se ejecuta `eas login`, se introducen las credenciales y se comprueba la sesión mediante `eas whoami`. [Configuración de EAS Build](https://docs.expo.dev/build/setup/)

### f) ¿Cómo configurar un proyecto para utilizar EAS Build?

En la carpeta del proyecto se ejecuta `eas build:configure`. El comando vincula o crea el proyecto de EAS y genera la configuración de compilación. Los perfiles se almacenan en `eas.json`. En esta práctica el archivo ya está preparado, pero todavía se necesita iniciar sesión para crear o vincular el proyecto remoto. [Configurar un proyecto para EAS Build](https://docs.expo.dev/build/setup/)

### g) ¿Cuál es la diferencia entre un archivo APK y un AAB?

El APK es un paquete instalable directamente en un dispositivo Android y resulta apropiado para pruebas o distribución interna. El AAB es un Android App Bundle que se publica en Google Play; la tienda genera APK optimizados para cada dispositivo. En EAS, Android produce AAB de forma predeterminada para producción. [Generar APK con EAS](https://docs.expo.dev/build-reference/apk/)

### h) ¿Qué perfiles de compilación existen (development, preview y production)?

- `development`: compilación para programadores; normalmente incluye `expo-dev-client`, herramientas de depuración y distribución interna.
- `preview`: versión interna semejante a la aplicación final, destinada a pruebas; en este proyecto se configuró para producir APK.
- `production`: versión lista para tiendas; normalmente produce AAB en Android y usa credenciales de producción.

Los nombres son convenciones configurables dentro de `eas.json`; cada perfil puede heredar o cambiar propiedades. [Referencia de eas.json](https://docs.expo.dev/build/eas-json/)

### i) ¿Cómo generar un APK utilizando EAS Build?

Se configura un perfil con `android.buildType` igual a `apk` y se ejecuta:

```powershell
eas build --platform android --profile preview
```

EAS envía el proyecto, realiza la compilación y entrega un enlace al artefacto. [Tutorial oficial para generar APK](https://docs.expo.dev/build-reference/apk/)

### j) ¿Cómo descargar e instalar el APK generado en un dispositivo Android?

Al terminar la compilación se abre en el teléfono la URL o el código QR entregado por EAS, se descarga el archivo y se pulsa para instalarlo. Android puede solicitar permiso para instalar aplicaciones desde esa fuente. Otra opción es descargarlo en la computadora y usar `adb install ruta-del-archivo.apk` con depuración USB habilitada. [Instalar una compilación en un dispositivo](https://docs.expo.dev/build/internal-distribution/)

## Entregables sugeridos

1. Captura de `eas whoami` con la sesión iniciada.
2. Captura del comando de compilación terminado.
3. Enlace de la compilación en Expo.
4. Archivo APK descargado.
5. Capturas de la aplicación instalada: ícono, splash, lista de usuarios y configuración de IP.
6. Este cuestionario contestado.
