import { obtenerMonedas, obtenerCotizacion } from './cambios.js';
import {
    configurarInputFecha,
    mostrarCotizaciones,
    mostrarListadoMonedas,
    obtenerFechaSeleccionada,
    obtenerMonedaSeleccionada,
    mostrarCartelActualizacion,
    buscadorMonedas,
} from './ui.js';

async function actualizar() {
    mostrarCartelActualizacion();
    const cotización = await obtenerCotizacion(obtenerMonedaSeleccionada(), obtenerFechaSeleccionada());
    mostrarCotizaciones(cotización);
}

async function inicializar() {
    mostrarListadoMonedas(await obtenerMonedas(), actualizar);
    configurarInputFecha(actualizar);
    buscadorMonedas();
}

inicializar();