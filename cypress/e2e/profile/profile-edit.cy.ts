let profileId = '';

describe('user visits profile page', () => {
  beforeEach(() => {
    cy.visit('');
    cy.login().then(data => {
      cy.visit(`profile/${data.id}`);
      profileId = data.id;
    });
  });
  afterEach(() => {
    cy.resetProfile(profileId);
  });
  it('...then it\'s loading successfully', () => {
    cy.getByTestId('ProfileCard.firstname').should('have.value', 'Lianne');
  });
  it('...then edits it', () => {
    cy.updateProfile();
    cy.getByTestId('ProfileCard.firstname').should('have.value', 'newFn');
    cy.getByTestId('ProfileCard.lastname').should('have.value', 'newLn');
  });
});