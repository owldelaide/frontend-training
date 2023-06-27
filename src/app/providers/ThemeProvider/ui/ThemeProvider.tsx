import { ThemeContext } from '@/shared/lib/context/ThemeContext';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Theme } from '../../../../shared/const/theme';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage';

interface ThemeProviderProps {
    initialTheme?: Theme;
    children: ReactNode;
}

const fallbackTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme;

const ThemeProvider = (props: ThemeProviderProps) => {
    const {
        children,
        initialTheme
    } = props;

    const [theme, setTheme] = useState<Theme>(initialTheme || fallbackTheme || Theme.LIGHT);
    const [isThemeInited, setIsThemeInited] = useState(false);

    useEffect(() => {
        if (!isThemeInited && initialTheme) {
            setTheme(initialTheme);
            setIsThemeInited(true);
        }
    }, [initialTheme, isThemeInited]);

    useEffect(() => {
        document.body.className = theme;
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
    }, [theme]);

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