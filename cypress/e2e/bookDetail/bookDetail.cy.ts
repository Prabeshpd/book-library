import { BOOK_DETAIL_SELECTOR } from './selectors';

describe('View book detail', () => {
  beforeEach(() => {
    cy.task('resetServerDatabase');
  });

  it('displays the book detail', () => {
    const [name, email, password] = ['default User', 'defaultUser@gmail.com', 'password'];

    cy.register({ name, email, password });
    cy.login({ email, password });
    cy.navigateTo('books');
    cy.findByTableHeaderColumn('category-column').contains('biography').first().click();

    cy.findByTestId(BOOK_DETAIL_SELECTOR.category).invoke('text').should('contain', 'biography');
    cy.findByTestId(BOOK_DETAIL_SELECTOR.borrowButton).invoke('text').should('contain', 'Borrow Book');
  });

  describe('given borrow book is clicked', () => {
    it('changes borrow button to borrowed text', () => {
      const [name, email, password] = ['default User', 'defaultUser@gmail.com', 'password'];

      cy.register({ name, email, password });
      cy.login({ email, password });
      cy.navigateTo('books');
      cy.findByTableHeaderColumn('category-column').contains('biography').first().click();

      cy.findByTestId(BOOK_DETAIL_SELECTOR.category).invoke('text').should('contain', 'biography');
      cy.findByTestId(BOOK_DETAIL_SELECTOR.borrowButton).click();
      cy.findByTestId(BOOK_DETAIL_SELECTOR.borrowedText).invoke('text').should('contain', 'Already Borrowed');
    });
  });
});
