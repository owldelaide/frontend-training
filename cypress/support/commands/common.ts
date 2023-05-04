/* eslint-disable @typescript-eslint/no-namespace */
import { selectByTestId } from '../../helpers/selectByTestId';
import { User } from '../../../src/entities/User/model/types/user';
import { USER_LOCAL_STORAGE_KEY } from '../../../src/shared/const/localStorage';

export const login = ((username = 'admin', password = '123') => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:8000/login',
        body: {
            username,
            password
        }
    }).then(({ body }) => {
        window.localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(body));
        return body;
    });
});

export const getByTestId = (testId: string) => {
    return cy.get(selectByTestId(testId));
};

declare global {
    namespace Cypress {
        interface Chainable {
            login(username?: string, password?: string): Chainable<User>,
            getByTestId(testId?: string): Chainable<JQuery<HTMLElement>>;
        }
    }
}