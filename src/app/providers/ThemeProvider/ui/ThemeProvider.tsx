import { ThemeContext } from '@/shared/lib/context/ThemeContext';
import { Theme } from '../../../../shared/const/theme';
import { ReactNode, useMemo, useState } from 'react';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage';

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || Theme.LIGHT;

interface ThemeProviderProps {
    initialTheme?: Theme;
    children: ReactNode;
}

const ThemeProvider = (props: ThemeProviderProps) => {

    const {
        children,
        initialTheme
    } = props;

    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

    const defaultProps = useMemo(() => ({
        theme: theme,
        setTheme: setTheme
    }), [theme]);

    return (
        <div>
            <ThemeContext.Provider value={defaultProps}>
                {children}
            </ThemeContext.Provider>
        </div>
    );
};

export default ThemeProvider;