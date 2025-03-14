import { CONFIG } from "../../config.js";
import { Cotizacion } from "../clase/clase.js";

export function obtenerCotizacion(tipo = 'latest', base = 'USD', fecha = null) {
  const BASE_URL = 'https://api.currencyapi.com/v3';
  let endpoint;

  if (tipo === 'historical') {
    endpoint = 'historical';
  } else {
    endpoint = 'latest'
  }

  let url = `${BASE_URL}/${endpoint}?base_currency=${base}`;

  if (tipo === 'historical' && fecha) {
    url += `&date=${fecha}`;
  }

  const cacheKey = `${base}_${tipo}_${fecha || ''}`;
  console.log(localStorage.getItem(`${base}_${tipo}_${fecha || ''}`));
  const cacheData = localStorage.getItem(cacheKey);

  const deferred = $.Deferred(); 

  if (cacheData) {
    console.log("Datos obtenidos del localStorage:", JSON.parse(cacheData));
    //si los datos están en caché resolvemos la promesa inmediatamente
    deferred.resolve(new Cotizacion(JSON.parse(cacheData)));
  } else {
    //si no están en caché hacemos la llamada AJAX
    $.ajax({
      url: url,
      method: 'GET',
      headers: {
        'apikey': CONFIG.API_KEY
      }
    })
    .done(function(data) {
      console.log("Datos de la API recibidos:", data);
      const cotizacion = new Cotizacion(data.data);
      localStorage.setItem(cacheKey, JSON.stringify(data.data));
      deferred.resolve(cotizacion); //la promesa se resuelve con el objeto cotizacion
    })
    .fail(function(error) {
      deferred.reject(error); //se rechaza en caso de error
    });
  }
  console.log("Promesa retornada:", deferred.promise());
  return deferred.promise(); //se retorna
}

export function obtenerMonedas() {
  const cacheKey = 'monedas';
  const cacheData = localStorage.getItem(cacheKey);

  const deferred = $.Deferred(); 

  if (cacheData) {
    deferred.resolve(JSON.parse(cacheData));
  } else {
    obtenerCotizacion()
      .done(function(data) {
        const monedas = data.monedas.map(moneda => moneda.codigo);
        localStorage.setItem(cacheKey, JSON.stringify(monedas));
        deferred.resolve(monedas);
      })
      .fail(function(error) {
        deferred.reject(error);
      });
  }

  return deferred.promise();
}
