let currentArticleId = '';

describe('open article details', () => {
  beforeEach(() => {
    cy.login();
    cy.createArticle().then((article) => {
      currentArticleId = article.id;
      cy.visit(`articles/${article.id}`);
    });
  });
  afterEach(() => {
    cy.removeArticle(currentArticleId);
  });
  it.skip('...and then it renders', () => {
    cy.getByTestId('ArticleDetails.Info').should('exist');
  });
  it.skip('...and then recs list renders', () => {
    cy.getByTestId('ArticleRecommendationsList').should('exist');
  });
  it.skip('...and leaves comm', () => {
    cy.getByTestId('ArticleDetails.Info');
    cy.getByTestId('AddCommentForm').scrollIntoView();
    cy.addComment('cypress text');
    cy.getByTestId('CommentCard.Content').should('have.length', 1);
  });
  it('...and rates article (with stub)', () => {
    cy.intercept('GET', '**/articles/*', { fixture: 'article-details.json' });
    cy.getByTestId('ArticleDetails.Info');
    cy.getByTestId('RatingCard').scrollIntoView();
    cy.setRate(5, 'feedback');
    cy.get('[data-selected=true]').should('have.length', 5);
  });
});