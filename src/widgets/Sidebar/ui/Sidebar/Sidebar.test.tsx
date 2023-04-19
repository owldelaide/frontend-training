import { Sidebar } from './Sidebar';
import { fireEvent, screen } from '@testing-library/react';
import { withTranslation } from 'react-i18next';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';

describe('Sidebar', () => {
    test('translation test', () => {
        const SidebarWithTranslation = withTranslation()(Sidebar);
        componentRender(<SidebarWithTranslation />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    test('toggle test', () => {
        componentRender(<Sidebar />);
        const togglebtn = screen.getByTestId('sidebar-toggle');
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        fireEvent.click(togglebtn);
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    });
});