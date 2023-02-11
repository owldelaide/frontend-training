import { classNames } from './classNames';

describe('classNames', () => {
    test('with 1st param only', () => {
        expect(classNames('someClass')).toBe('someClass');
    });

    test('with additional class', () => {
        const expected = 'someClass cls1 cls2';
        expect(classNames('someClass', {}, ['cls1', 'cls2'])).toBe(expected);
    });

    test('with mods', () => {
        const expected = 'someClass cls1 cls2 hovered scrollable';
        expect(classNames(
            'someClass',
            { hovered: true, scrollable: true },
            ['cls1', 'cls2']
        )).toBe(expected);
    });

    test('with false mod', () => {
        const expected = 'someClass cls1 cls2 scrollable';
        expect(classNames(
            'someClass',
            { hovered: false, scrollable: true },
            ['cls1', 'cls2']
        )).toBe(expected);
    });

    test('with undefined mod', () => {
        const expected = 'someClass cls1 cls2 hovered';
        expect(classNames(
            'someClass',
            { hovered: true, scrollable: undefined },
            ['cls1', 'cls2']
        )).toBe(expected);
    });
});