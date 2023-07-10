import React, { useState } from 'react';

interface Theme {
    backgroundColor: string;
    color: string;
    backgroundColorElement: string;
}

interface ThemeProviderProps {
    children: React.ReactNode;
    theme?: Theme; // Add optional theme property
}

interface ThemeContextValue {
    theme: Theme;
    dark: boolean;
    toggle: () => void;
}

const themes = {
    dark: {
        backgroundColor: '#3e3e3e',
        color: 'white',
        backgroundColorElement: "#4D4D4D"
    },
    light: {
        backgroundColor: 'white',
        color: 'black',
        backgroundColorElement: "#white"
    },
};

const initialState: ThemeContextValue = {
    dark: true,
    theme: themes.light,
    toggle: () => { },
};

const ThemeContext = React.createContext<ThemeContextValue>(initialState);

const ThemeProvider: React.FC<ThemeProviderProps> = ({
    children,
    theme = themes.light, // Set default theme if not provided
}) => {
    const [dark, setDark] = useState(false);

    const toggle = () => {
        const isDark = !dark;
        setDark(isDark);
    };

    const selectedTheme: Theme = dark ? themes.dark : theme; // Use theme prop if provided, else use dark theme

    return (
        <ThemeContext.Provider value={{ theme: selectedTheme, dark, toggle }}>
            {children}
        </ThemeContext.Provider>
    );
};

export { ThemeProvider, ThemeContext };