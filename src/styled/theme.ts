const theme = {
  colors: {
    light1: '#FAFAFA',
    light1Transparent: '#FAFAFA88',
    light2: '#DADFE1',
    light3: '#BFBFBF',
    light4: '#777',
    blue: '#1E8BC3',
    blueLight: '#22A7F0',
    blueDark: '#67809F',
    green: '#06AD96',
    greenDark: '#009680',
    red: '#F22613',
    redLight: '#F94D2A',
    redDark: '#985A5A',
  },
  shadows: {
    level1: '0 0 3px rgba(0, 0, 0, 0.03)',
    level2: '0 0 3px rgba(0, 0, 0, 0.3)',
    level3: '0 0 5px rgba(0, 0, 0, 0.3)',
  },
  fonts: {
    logo: 'Lobster, cursive',
    heading: 'Noto Sans, sans-serif',
    text: 'Nunito, sans-serif',
  },
  spacings: {
    level1: '0.8rem',
    level2: '1.2rem',
    level3: '2.4rem',
    level4: '3.6rem',
    level5: '4.8rem',
  },
  zIndexes: {
    level1: 10,
    level2: 100,
    level3: 1000,
    level4: 10000,
    level5: 100000,
  },
  fontSizes: {
    level1: '1.3rem',
    level2: '1.4rem',
    level3: '1.5rem',
    level4: '1.7rem',
    level5: '2.2rem',
    level6: '2.6rem',
  },
  durations: {
    level1: 0.1,
    level2: 0.2,
    level3: 0.3,
  },
  lineHeights: {
    level1: '1',
    level2: '1.1',
    level3: '1.2',
    level4: '1.3',
    level5: '1.4',
    level6: '1.5',
  },
};

export type ThemeSpacing = keyof typeof theme.spacings;
export type ThemeZIndex = keyof typeof theme.zIndexes;
export type ThemeFontSize = keyof typeof theme.fontSizes;
export type ThemeDuration = keyof typeof theme.durations;
export type ThemeLineHeight = keyof typeof theme.lineHeights;

export default theme;
