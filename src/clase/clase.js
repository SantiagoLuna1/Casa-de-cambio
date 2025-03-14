export class Cotizacion {
  constructor(data) {
    this.monedas = Object.entries(data).map(([codigo, valor]) => ({ codigo, valor: valor.value }));
  }

  forEach(callback) {  //para recorrer las monedas
    this.monedas.forEach(callback);
  }
}

