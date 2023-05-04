/* eslint-disable @typescript-eslint/no-namespace */

export const setRate = ((starsCount: number, feedback: string) => {
    cy.getByTestId(`StarRating.${starsCount}`).click();
    cy.getByTestId('RatingCard.Input').type(feedback);
    cy.getByTestId('RatingCard.SendButton').click();
});

declare global {
    namespace Cypress {
        interface Chainable {
            setRate(starsCount: number, feedback: string): Chainable<void>,
        }
    }
}