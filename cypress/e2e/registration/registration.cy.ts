import { REGISTRATION_SELECTOR } from './selectors';

describe('Register', () => {
  beforeEach(() => {
    cy.task('resetServerDatabase');
  });

  describe('given valid credentials', () => {
    it('creates user successfully', () => {
      cy.visit('/register');

      cy.findByTestId(REGISTRATION_SELECTOR.inputName).type('Default User');
      cy.findByTestId(REGISTRATION_SELECTOR.inputEmail).type('defaultUser@gmail.com');
      cy.findByTestId(REGISTRATION_SELECTOR.inputPassword).type('password');

      cy.findByTestId(REGISTRATION_SELECTOR.submitButton).invoke('click');

      cy.hasToastMessage('success', 'The user account has been successfully created. You can now log in.');
      cy.location().should((location) => {
        expect(location.pathname).to.eq('/login');
      });
    });
  });

  describe('given email is NOT unique', () => {
    it('throws error', () => {
      const [name, email, password] = ['default User', 'defaultUser@gmail.com', 'password'];
      cy.register({ name, email, password });

      cy.visit('/register');
      cy.findByTestId(REGISTRATION_SELECTOR.inputName).type(name);
      cy.findByTestId(REGISTRATION_SELECTOR.inputEmail).type(email);
      cy.findByTestId(REGISTRATION_SELECTOR.inputPassword).type(password);

      cy.findByTestId(REGISTRATION_SELECTOR.submitButton).invoke('click');

      cy.hasToastMessage('error', 'An issue occurred when creating the user account');
    });
  });
});
