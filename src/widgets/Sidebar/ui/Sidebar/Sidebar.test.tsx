import { Sidebar } from './Sidebar';
import { fireEvent, screen } from '@testing-library/react';
import { withTranslation } from 'react-i18next';
import { renderWithTranslation } from '../../../../shared/lib/tests/renderWithTranslation/renderWithTranslation';

describe('Sidebar', () => {
    test('translation test', () => {
        const SidebarWithTranslation = withTranslation()(Sidebar);
        renderWithTranslation(<SidebarWithTranslation />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    test('toggle test', () => {
        renderWithTranslation(<Sidebar />);
        const togglebtn = screen.getByTestId('sidebar-toggle');
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        fireEvent.click(togglebtn);
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    });
});