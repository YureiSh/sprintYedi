describe('S8 to success', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/');

    //cy.get('[data-cy="input-username"]').type("emres");
    cy.get('[data-cy="form-email"]').type("esdeekid@hmail.com");
    cy.get('[data-cy="form-password"]').type("12345");
    cy.get('[data-cy="form-terms"]').click();
    cy.contains('button', 'Sign In').click()

    cy.url().should('include', '/success');

    cy.contains('Success').should('be.visible');
  })
})

describe('Login failed scenarios', () => {
  it('will not pass, email wrong', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-cy="form-email"]').type('text');
    cy.get('[data-cy="form-password"]').type('12345');
    cy.get('[data-cy="form-terms"]').check({ force: true });

    //buton disabled mı?
    cy.contains('button', 'Sign In').should('be.disabled');

    //Hata meesajı var mı?
    cy.get('.invalid-feedback:visible').should('have.length', 1);

    //Hata mesajı bekleniyor ve alındı
    cy.contains('Please enter a valid email address').should('be.visible');

    cy.url().should('eq', 'http://localhost:5173/');


  })
})

describe('Login failed scenarios', () => {
  it('will not pass, email ve password yanlış', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-cy="form-email"]').type('text');
    cy.get('[data-cy="form-password"]').type('xxx');
    cy.get('[data-cy="form-terms"]').check({ force: true });

    cy.contains('button', 'Sign In').should('be.disabled');

    cy.get('.invalid-feedback:visible').should('have.length', 2);

    cy.contains('Please enter a valid email address').should('be.visible');
    cy.contains('Password must be at least 4 characters long').should('be.visible');

    cy.url().should('eq', 'http://localhost:5173/');

  })
})
describe('Login failed scenarios', () => {
  it('will not pass, email ve password doğru ama kuralları kabul etmedik', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-cy="form-email"]').type("esdeekid@hmail.com");
    cy.get('[data-cy="form-password"]').type("12345");

    cy.contains('button', 'Sign In').should('be.disabled');

    cy.url().should('eq', 'http://localhost:5173/');

  })
})
