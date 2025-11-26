import React, { createContext, useContext, useEffect, useState } from 'react';

export type ThemeName = 'cyber' | 'forest' | 'ocean' | 'sunset';

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// RGB values for themes
const THEMES: Record<ThemeName, { primary: any; canvas: any }> = {
  cyber: {
    // Indigo & Slate (Default)
    primary: {
      400: '129 140 248',
      500: '99 102 241',
      600: '79 70 229',
    },
    canvas: {
      50: '248 250 252',
      100: '241 245 249',
      200: '226 232 240',
      300: '203 213 225',
      400: '148 163 184',
      500: '100 116 139',
      600: '71 85 105',
      700: '51 65 85',
      800: '30 41 59',
      900: '15 23 42',
      950: '2 6 23',
    }
  },
  forest: {
    // Emerald & Zinc
    primary: {
      400: '52 211 153',
      500: '16 185 129',
      600: '5 150 105',
    },
    canvas: {
      50: '250 250 250',
      100: '244 244 245',
      200: '228 228 231',
      300: '212 212 216',
      400: '161 161 170',
      500: '113 113 122',
      600: '82 82 91',
      700: '63 63 70',
      800: '39 39 42',
      900: '24 24 27',
      950: '9 9 11',
    }
  },
  ocean: {
    // Sky & Slate
    primary: {
      400: '56 189 248',
      500: '14 165 233',
      600: '2 132 199',
    },
    canvas: {
      // Same slate base but slightly cooler tone could be used, sticking to slate for consistency
      50: '248 250 252',
      100: '241 245 249',
      200: '226 232 240',
      300: '203 213 225',
      400: '148 163 184',
      500: '100 116 139',
      600: '71 85 105',
      700: '51 65 85',
      800: '30 41 59',
      900: '15 23 42',
      950: '2 6 23',
    }
  },
  sunset: {
    // Orange & Stone
    primary: {
      400: '251 146 60',
      500: '249 115 22',
      600: '234 88 12',
    },
    canvas: {
      50: '250 250 249',
      100: '245 245 244',
      200: '231 229 228',
      300: '214 211 209',
      400: '168 162 158',
      500: '120 113 108',
      600: '87 83 78',
      700: '68 64 60',
      800: '41 37 36',
      900: '28 25 23',
      950: '12 10 9',
    }
  }
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeName>('cyber');

  useEffect(() => {
    const root = document.documentElement;
    const colors = THEMES[theme];

    // Set Primary Colors
    Object.entries(colors.primary).forEach(([key, value]) => {
      root.style.setProperty(`--primary-${key}`, value as string);
    });

    // Set Canvas Colors
    Object.entries(colors.canvas).forEach(([key, value]) => {
      root.style.setProperty(`--canvas-${key}`, value as string);
    });
    
    // Update meta theme color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
        // Approximate hex for 950 based on theme
        const colorMap: Record<ThemeName, string> = {
            cyber: '#020617',
            forest: '#09090b',
            ocean: '#020617',
            sunset: '#0c0a09'
        };
        metaThemeColor.setAttribute('content', colorMap[theme]);
    }

  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};