# Close To Yoy - X-Ray

**Close To Yoy - X-Ray** es una aplicación móvil que permite guardar información de contacto, incluyendo imagen, nombre, teléfono, ubicación y clima asociado a la ubicación. Utiliza APIs de Google Maps para obtener la ubicación y OpenWeather para mostrar el clima en tiempo real según la ubicación del contacto.

## Tecnologías Usadas

- **CSS** y **TypeScript** para el estilo y tipado en la aplicación.
- **JWT** para la autenticación.
- **React Native** para el desarrollo de la aplicación móvil.
- **NestJS** para el backend de la API.
- **MySQL** para almacenar los datos de los contactos en la base de datos.
- **Google Maps API** para obtener la ubicación del contacto.
- **OpenWeather API** para mostrar el clima según la ubicación guardada.
- **OnRender** para el despliegue del servidor en la nube.

## Requisitos Previos

Antes de empezar, asegúrate de tener instalados los siguientes componentes en tu entorno de desarrollo:

- **Node.js** (recomendado v14+)
- **Yarn** (opcional, pero recomendado para manejar dependencias)
- **Android Studio** para ejecutar la aplicación en un emulador Android.
- **react-native-vector-icons** para los iconos de la interfaz.
- **JWT** para el manejo de la autenticación.

## Instalación y Configuración

### Pasos para la instalación:

1. Clona el repositorio:
   ```bash
      git clone https://github.com/miusuario/close-to-yoy-xray.git
      # Navega al directorio de la aplicación:
   ```

```bash
# Copiar código
cd close-to-yoy-xray

# Instala las dependencias:


# Copiar código
$ npm install

# o si usas Yarn:
$ yarn install
```
## Configuración adicional:

# API Keys:
Necesitarás obtener claves API para Google Maps y OpenWeather.
Coloca estas claves en los archivos de configuración adecuados.
Para ejecutar la aplicación en un dispositivo Android o en un emulador:

```bash
# Copiar código
$ npx react-native run-android
```
## Uso de la Aplicación
Pantalla de Login:

La aplicación solicita un correo y contraseña para iniciar sesión.
Si no estás registrado, puedes hacerlo haciendo clic en el botón Sign In y completando el formulario con tu correo y contraseña.
Después de registrarte, serás redirigido nuevamente a la pantalla de login.
Pantalla Principal (Home):

Una vez iniciada la sesión, serás dirigido a la pantalla principal, donde podrás agregar nuevos contactos.
Para agregar un contacto, ingresa la imagen desde la cámara o galería, el nombre, teléfono, email y selecciona la ubicación en el mapa de Google Maps.
Haz clic en el ícono de Save para guardar el contacto.
Los contactos se organizan alfabéticamente y se muestran en la pantalla principal.
Detalles del Contacto:

Al hacer clic en un contacto, podrás ver la información guardada junto con el clima en tiempo real, gracias a la integración con OpenWeather.
En esta pantalla, hay dos iconos disponibles:
Editar: Permite cambiar la información, foto o ubicación del contacto.
Eliminar: Permite eliminar el contacto.
Cierre de Sesión:

Si cierras la aplicación, deberás ingresar nuevamente el correo y la contraseña que usaste para registrarte.


## Características
Guardar información de contactos: Incluye foto, nombre, teléfono, email y ubicación.
Clima según ubicación: Utiliza la API de OpenWeather para obtener el clima actual basado en las coordenadas guardadas en Google Maps.
Almacenamiento en la nube: Los contactos están almacenados en un servidor en la nube, desplegado en OnRender, lo que permite acceder a los datos desde cualquier dispositivo Android, sin importar el dispositivo usado previamente.
Sincronización: Al iniciar sesión en cualquier dispositivo, los contactos guardados previamente se cargarán automáticamente.

## API
Backend en OnRender:

Utiliza un servidor desplegado en OnRender que almacena la base de datos de usuarios y contactos.
Proporciona endpoints para la autenticación de usuarios y el manejo de contactos.
Google Maps API:

Utiliza Google Maps para seleccionar la ubicación del contacto y obtener las coordenadas para pasar a la siguiente API.
OpenWeather API:

Usa las coordenadas obtenidas de Google Maps para obtener el clima en tiempo real mediante la API de OpenWeather.

# Licencias
Google Maps API y OpenWeather API:
Ambas APIs se usan con claves gratuitas, pero con ciertas limitaciones. Google Maps es una clave de prueba y OpenWeather es gratuita.

# Contribución
No hay contribución formal en este proyecto. Aunque no se aplican todas las mejores prácticas de desarrollo, la aplicación funciona bien y su estructura y código pueden ser mejorados.

# Contacto
Si tienes más dudas sobre este proyecto, puedes escribirme a:
franco.hopper.riwi@gmail.com