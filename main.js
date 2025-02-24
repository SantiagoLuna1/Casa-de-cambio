function tasasEnTiempoReal(base = 'EUR', fecha = 'latest') {
    const BASE_URL = 'https://api.exchangeratesapi.io/v1';
    return fetch(`${BASE_URL}/${fecha}?access_key=${CONFIG.API_KEY}&base=${base}`)
        .then((r) => r.json())
        .then((r) => r.rates);
}  //la funcion hace la solicitud a la API

function obtenerMonedas() {
    return tasasEnTiempoReal().then((resultado) => Object.keys(resultado).concat('EUR')); //en la lista de monedas tenemos el Euro
}

function mostrarCambios(cambios) {
    const $cambios = document.querySelector('#cambio tbody');
    $cambios.innerHTML = '';

    Object.keys(cambios).sort().forEach((moneda) => {
        const $fila = document.createElement('tr'); // crea una fila
        const $moneda = document.createElement('td');  // crea una celda para moneda
        const $cambio = document.createElement('td');  // crea una celda para cambio
        $moneda.textContent = moneda;  
        $cambio.textContent = cambios[moneda];
        $fila.appendChild($moneda);
        $fila.appendChild($cambio);
        $cambios.appendChild($fila);
    });
}

function mostrarListadoMonedas(monedas) {
    const $lista = document.createElement('div');
    $lista.className = 'list-group'; 

    monedas.sort().forEach((base) => {
        const $item = document.createElement('a');
        $item.href = '#';
        $item.classList.add('list-group-item', 'list-group-item-action');
        $item.textContent = base;
        $item.dataset.base = base; //crea data-base
        $item.addEventListener('click', () => {
            const $itemActivo = document.querySelector('.list-group-item.active');
            if ($itemActivo) {
                $itemActivo.classList.remove('active');
            }
            $item.classList.add('active');
            actualizar();
            
        });
        $lista.appendChild($item);
    });

    document.querySelector('#monedas').appendChild($lista); //todo se crea dentor del <div id="monedas">
}

function obtenerMonedaSeleccionada() {
    const $activeItem = document.querySelector('.list-group-item.active');
    if ($activeItem) {
        return document.querySelector('.list-group-item.active').dataset.base;
    }

    return undefined;
}

function obtenerFechaSeleccionada() {
    const fechaSeleccionada = document.querySelector('#fecha').value;
    return fechaSeleccionada || undefined;  //si no se selecciona una fecha, usa 'latest'
}

function mostrarCartelActualizacion() {
    document.querySelector('#cambio tbody').innerHTML = 'Cargando...';
}

function actualizar() {
    mostrarCartelActualizacion();
    tasasEnTiempoReal(obtenerMonedaSeleccionada(), obtenerFechaSeleccionada())
        .then((cambios) => {
            mostrarCambios(cambios);
        });
}

function configurarInputFecha() {
    const $fecha = document.querySelector('#fecha');
    const hoy = (new Date()).toISOString().split('T') [0];
    $fecha.setAttribute('max', hoy);
    $fecha.addEventListener('change', actualizar);
}

function inicializar() {
    obtenerMonedas().then((monedas) => {
        mostrarListadoMonedas(monedas);
    });

    configurarInputFecha();
}

inicializar();