import { createMuiTheme, responsiveFontSizes } from '@material-ui/core'

/**
 * Theme for this Gatsby project.
 * This is necessary because there is no more pleasant way to approach FUOC with MaterialUI theming.
 */
let theme = createMuiTheme({
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
  palette: {
    primary: {
      main: '#1B1B1B',
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
})
theme = responsiveFontSizes(theme)

export default theme
