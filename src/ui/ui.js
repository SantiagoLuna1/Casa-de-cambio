export function mostrarCambios(cotizacion) {
  const $cambios = $('#cotización tbody');
  $cambios.empty();

  cotizacion.forEach((moneda) => {
    const $fila = $('<tr></tr>');
    const $moneda = $('<td></td>').text(moneda.codigo);
    const $cambio = $('<td></td>').text(moneda.valor);
    
    $fila.append($moneda, $cambio);
    $cambios.append($fila);
  });
}

export function mostrarListadoMonedas(monedas, callbackSeleccionMoneda) {
  const $lista = $('<div></div>').addClass('list-group');

  monedas.forEach((base) => {
    const $item = $('<a></a>')
    .attr('href','#')
    .addClass('list-group-item list-group-item-action')
    .text(base)
    .data('base', base)
    .on('click', function () {
      $('.list-group-item.active').removeClass('active'); 
      $(this).addClass('active');
      callbackSeleccionMoneda(base);
    });
    $lista.append($item);
  });

  $('#monedas').append($lista);
}

export function obtenerMonedaSeleccionada() {
  const $activeItem = $('.list-group-item.active');
  if ($activeItem.length) {
    return $activeItem.data('base');
  } //no necesita undefined porque lo hace automatico
}

export function obtenerTipo() {
  const fechaSeleccionada = $('#fecha').val();
  
  if (fechaSeleccionada) {
    return 'historical';
  } 
    return 'latest';
}

export function obtenerFechaSeleccionada() {
  return $('#fecha').val() || null;
}

export function configurarInputFecha(callbackSeleccionFecha) {
  $('#fecha')
    .attr('max', (new Date()).toISOString().split('T')[0])
    .on('change', callbackSeleccionFecha);
}

export function mostrarCartelActualizacion() {
  $('#cotización tbody').html('Cargando...');
}