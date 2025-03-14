/// <reference types="Cypress" />

describe('Casa de cambio', () => {
  const URL = 'http://127.0.0.1:8080/#';

  beforeEach(() => {
    cy.intercept('GET', '/api/cotizacion', { 
      fixture: 'cotizacionARS'
    });

    cy.visit(URL);

    cy.reload();
  });

  it('Debe mostrar todas las monedas en el listado', () => {
    cy.get('.list-group-item').should('have.length', 189);
  });

  it('Debe cambiar la base a ARS y su valor debe ser 1', () => {
    cy.get('.list-group-item').contains('ARS').click();

    cy.get('#cotización tbody tr')
      .contains('ARS')
      .parent()
      .find('td')
      .eq(1)
      .should('have.text', '1');

    cy.get('#cotización tbody tr')
      .contains('USD')
      .parent()
      .find('td')
      .eq(1)
      .should('have.text', '0.0009382234');
  });

  it('La moneda ARS debe estar activa después de hacer click', () => {
    cy.get('.list-group-item').contains('ARS').click();
    cy.get('.list-group-item.active').should('have.text', 'ARS');
  });
});