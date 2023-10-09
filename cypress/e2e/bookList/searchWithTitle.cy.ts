import { BOOK_LIST_FILTER_SELECTOR, BOOK_LIST_SELECTOR } from './selectors';

describe('Filter books with title', () => {
  beforeEach(() => {
    cy.task('resetServerDatabase');
  });

  describe('given valid search params', () => {
    it('displays valid data', () => {
      const queryText = 'War And Peace';
      const [name, email, password] = ['default User', 'defaultUser@gmail.com', 'password'];

      cy.register({ name, email, password });
      cy.login({ email, password });
      cy.navigateTo('books');
      cy.findByTestId(BOOK_LIST_FILTER_SELECTOR.inputText).type(queryText);
      cy.findByTestId(BOOK_LIST_FILTER_SELECTOR.submitButton).click();

      cy.findByTestId(BOOK_LIST_SELECTOR.tableBody).children().as('tableRows');

      cy.get('@tableRows').should('have.length', 1);
      cy.findByTableHeaderColumn('title-column').should('contain', queryText);
    });
  });
});
