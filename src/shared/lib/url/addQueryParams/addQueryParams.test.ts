import { getQueryParams } from './addQueryParams';

describe('addQueryParams.test', () => {
    test('with one param', () => {
        const params = getQueryParams({
            test: 'value'
        });
        expect(params).toBe('?test=value');
    });

    test('with multiple params', () => {
        const params = getQueryParams({
            test: 'value',
            test2: 'value2'
        });
        expect(params).toBe('?test=value&test2=value2');
    });

    test('with undefined', () => {
        const params = getQueryParams({
            test: 'value',
            test2: undefined
        });
        expect(params).toBe('?test=value');
    });
});