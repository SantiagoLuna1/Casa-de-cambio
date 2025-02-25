export function mostrarCotizaciones(cambios) {
    const $tbody = document.querySelector('#cotización tbody');
    $tbody.innerHTML = '';

    Object.keys(cambios).sort().forEach((moneda) => {
        const $fila = document.createElement('tr'); //Fila
        const $celdaMoneda = document.createElement('td'); //Celda de 1° fila
        const $celdaCotización = document.createElement('td'); //Celda de 2° fila

        $celdaMoneda.textContent = moneda;
        $celdaCotización.textContent = cambios[moneda];

        $fila.appendChild($celdaMoneda);
        $fila.appendChild($celdaCotización);

        $tbody.appendChild($fila);
    });
}

export function mostrarListadoMonedas(monedas, callbackSeleccionMoneda) {
    const $lista = document.createElement('div');
    $lista.className = 'list-group';

    monedas.sort().forEach((base) => {
        const $item = document.createElement('a');
        $item.href = '#';
        $item.classList.add('list-group-item', 'list-group-item-action');
        $item.textContent = base;
        $item.dataset.base = base;
        $item.addEventListener('click', () => {
            const $itemActivo = document.querySelector('.list-group-item.active');
            if ($itemActivo) {
                $itemActivo.classList.remove('active');
            }
            $item.classList.add('active');

            callbackSeleccionMoneda(base);
        });
        $lista.appendChild($item);
    });
    document.querySelector('#monedas').appendChild($lista);
}

export function obtenerMonedaSeleccionada() {
    const $activeItem = document.querySelector('.list-group-item.active');
    if ($activeItem) {
        return document.querySelector('.list-group-item.active').dataset.base;
    }

    return undefined;
}

export function obtenerFechaSeleccionada() {
    const fechaSeleccionada = document.querySelector('#fecha').value;
    return fechaSeleccionada || undefined;
}

export function configurarInputFecha(callbackSeleccionFecha) {
    const $fecha = document.querySelector('#fecha');

    $fecha.setAttribute('max', (new Date()).toISOString().split('T')[0]);
    $fecha.addEventListener('change', callbackSeleccionFecha);
}

export function mostrarCartelActualizacion() {
    document.querySelector('#cotización tbody').innerHTML = 'Cargando...';
}

export function buscadorMonedas() {
    const $inputBuscador = document.createElement('input');
    $inputBuscador.type = 'text';
    $inputBuscador.placeholder = 'Buscar moneda...';
    $inputBuscador.className = 'form-control mb-2';

    $inputBuscador.addEventListener('input', () => {
        const filtro = $inputBuscador.value.toLowerCase();
        document.querySelectorAll('.list-group-item').forEach(($item) => {
            const texto = $item.textContent.toLowerCase();
            if (texto.includes(filtro)) {
                $item.style.display = '';
            } else {
                $item.style.display = 'none';
            }
            });
        });

    const $monedas = document.querySelector('#monedas');
    $monedas.prepend($inputBuscador); // Agrega el input al inicio del contenedor
}