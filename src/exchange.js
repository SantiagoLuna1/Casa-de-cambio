import { CONFIG } from "../config.js";

const BASE_URL = 'https://api.currencyapi.com/v3';

export function obtenerCotizacion(base = 'USD', fecha = 'latest') {
    let url;

    if (fecha === 'latest') {
        url = `${BASE_URL}/latest?base_currency=${base}`;
    } else {
        url = `${BASE_URL}/historical?date=${fecha}&base_currency=${base}`;
    }
    return fetch(url, {
        headers: {
            apikey: CONFIG.API_KEY,
        },
    })
    .then((r) => r.json())
    .then((r) => {

        const resultado = {}; //objeto para almacenar las tasas de cambio

        for (const moneda in r.data) {         //recorremos cada moneda en los datos
            resultado[moneda] = r.data[moneda].value; //extraemos solo el valor de cada moneda
        }

        return resultado; //devolvemos el objeto con las tasas de cambio
    });
}

export function obtenerMonedas() {
    return obtenerCotizacion().then((resultado) => Object.keys(resultado));
} //agrega la moneda base a la lista de monedas