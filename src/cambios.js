import * as exchange from './exchange.js';

export async function obtenerCotizacion(base = 'USD', fecha = 'latest') {
    const llaveCache = `cambio_${base}_${fecha}`; //almacena la informacion
    const baseCache = localStorage.getItem(llaveCache);
    if (baseCache) {
        return JSON.parse(baseCache); //si los datos existen los devuelve
    }

    const cambios = await exchange.obtenerCotizacion(base, fecha); //si no existen hace el llamado a la API
    localStorage.setItem(llaveCache, JSON.stringify(cambios));

    return cambios;
}

export async function obtenerMonedas() {
    const llaveCache = 'monedas';

    const baseCache = localStorage.getItem('monedas');
    if (baseCache) {
        return JSON.parse(baseCache);
    }

    const monedas = await exchange.obtenerMonedas();
    localStorage.setItem(llaveCache, JSON.stringify(monedas));

    return monedas;
}