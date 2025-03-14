import { obtenerCotizacion, obtenerMonedas } from "./api/api.js";
import { 
  configurarInputFecha,
  mostrarCambios, 
  mostrarCartelActualizacion, 
  mostrarListadoMonedas, 
  obtenerFechaSeleccionada,
  obtenerMonedaSeleccionada, 
  obtenerTipo,
} from "./ui/ui.js";

function actualizar() {
  mostrarCartelActualizacion();

  obtenerCotizacion(obtenerTipo(), obtenerMonedaSeleccionada(), obtenerFechaSeleccionada())
    .done(function(cotizacion) {
      mostrarCambios(cotizacion);
    })
    .fail(function(error) {
      console.error("Error al obtener la cotización:", error);
    });
}

function inicializar() {
  obtenerMonedas()
    .done(function(monedas) {
      mostrarListadoMonedas(monedas, actualizar);
    })
    .fail(function(error) {
      console.error("Error al obtener las monedas:", error);
    });

  configurarInputFecha(actualizar);
}

inicializar();