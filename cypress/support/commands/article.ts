import { Article } from './../../../src/entities/Article/model/types/article';
/* eslint-disable @typescript-eslint/no-namespace */

const defaultArticle = {
    'title': 'Kotlin news',
    'subtitle': 'Что нового в JS за 2022 год?',
    'img': 'https://logowik.com/content/uploads/images/kotlin.jpg',
    'views': 1022,
    'createdAt': '26.02.2022',
    'userId': '1',
    'type': [
        'IT'
    ],
    'blocks': []
};

export const createArticle = ((article?: Article) => {
    return cy.request({
        method: 'POST',
        url: 'http://localhost:8000/articles',
        headers: { Authorization: 'somehash' },
        body: article ?? defaultArticle
    }).then(response => response.body);
});

export const removeArticle = (articleId: string) => {
    cy.request({
        method: 'DELETE',
        url: `http://localhost:8000/articles/${articleId}`,
        headers: { Authorization: 'somehash' },
    });
};

declare global {
    namespace Cypress {
        interface Chainable {
            createArticle(article?: Article): Chainable<Article>,
            removeArticle(articleId: string): Chainable<void>,
        }
    }
}