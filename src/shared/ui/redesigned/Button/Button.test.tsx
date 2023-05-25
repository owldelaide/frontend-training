import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
    test('render test', () => {
        render(<Button>test</Button>);
        expect(screen.getByText('test')).toBeInTheDocument();
    });

    test('clear theme test', () => {
        render(<Button variant={'clear'}>test</Button>);
        expect(screen.getByText('test')).toHaveClass('clear');
        screen.debug();
    });
});