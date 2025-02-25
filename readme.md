# Casa de Cambio

Este proyecto es una **Casa de Cambio en línea** que permite consultar el tipo de cambio de distintas monedas en tiempo real y en una fecha específica, utilizando la API de Currencyapi.

## Características

- Consulta en tiempo real de las tasas de cambio entre distintas monedas.
- Visualización de la lista de monedas disponibles para realizar la conversión.
- Posibilidad de seleccionar la fecha para obtener datos históricos del tipo de cambio.
- Interfaz amigable que permite ver las tasas de cambio en una tabla.

## Requisitos

- **Clave de API** de Currencyapi para realizar las consultas.
  
### Cómo obtener tu clave de API

1. Regístrate en [Currencyapi](https://currencyapi.com/) y obtén tu clave gratuita de API.
2. Guarda la clave en un archivo `config.js` como se explica en la sección de **Configuración** más abajo.

## Instalación

1. Clona el repositorio
2. Utiliza "npm install" para instalar dependencias.

## Configuración

Para configurar la clave de la API, sigue estos pasos:

1. Renombra el archivo `config-ejemplo.js` a `config.js`.
2. Abre `config.js` y reemplaza `'tu_api_key_aqui'` con tu clave de API personal.
3. Guarda los cambios y ya está listo para usar. 
