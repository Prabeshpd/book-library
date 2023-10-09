import { PROFILE_SELECTOR, BOOK_LIST_SELECTOR } from './selectors';
import { BOOK_DETAIL_SELECTOR } from '../bookDetail/selectors';

describe('View profile', () => {
  beforeEach(() => {
    cy.task('resetServerDatabase');
  });

  it('displays the profile', () => {
    const [name, email, password] = ['default User', 'defaultUser@gmail.com', 'password'];

    cy.register({ name, email, password });
    cy.login({ email, password });
    cy.navigateTo('profile');

    cy.findByTestId(PROFILE_SELECTOR.email).invoke('text').should('contain', 'defaultUser@gmail.com');
    cy.findByTestId(BOOK_LIST_SELECTOR.tableBody).children().should('have.length', 0);
  });

  describe('given borrow book is clicked', () => {
    it('displays valid data on user books table', () => {
      const [name, email, password] = ['default User', 'defaultUser@gmail.com', 'password'];

      cy.register({ name, email, password });
      cy.login({ email, password });
      cy.navigateTo('books');
      cy.findByTableHeaderColumn('category-column').contains('biography').first().click();
      cy.findByTestId(BOOK_DETAIL_SELECTOR.borrowButton).click();

      cy.navigateTo('profile');
      cy.findByTestId(BOOK_LIST_SELECTOR.tableBody).children().should('have.length', 1);
      cy.findByTableHeaderColumn('category-column').should('contain', 'biography');
    });
  });
});
