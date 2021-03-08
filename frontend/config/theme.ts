import { createMuiTheme, responsiveFontSizes, ThemeOptions } from '@material-ui/core'

export const paletteColorsDark = {
  primary: {
    main: '#FFFFFF',
  },
  secondary: {
    main: '#1b1b1b',
  },
  error: '#E44C65',
  background: '#1b262c',
  text: '#FFFFFF',
}

export const paletteColorsLight = {
  primary: {
    main: '#1b1b1b',
  },
  secondary: {
    main: '#FFFFFF',
  },
  error: '#E44C65',
  background: '#f9f9f9',
  text: {
    primary: '#000000',
  },
}

const options = (dark: boolean): ThemeOptions => {
  const paletteColors = dark ? paletteColorsDark : paletteColorsLight
  return {
    palette: {
      type: dark ? 'dark' : 'light',
      primary: paletteColors.primary,
      secondary: paletteColors.secondary,
      background: {
        default: '#FFFFFF',
      },
      text: {
        primary: '#000000',
      },
    },
    typography: {
      fontFamily: [
        'GT Walsheim Pro',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        'Megona',
      ].join(','),
      h2: {
        fontWeight: 700,
      },
    },
  }
}

export const darkTheme = responsiveFontSizes(createMuiTheme(options(true)))
export const lightTheme = responsiveFontSizes(createMuiTheme(options(false)))
