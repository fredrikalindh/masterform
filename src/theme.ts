import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import grey from '@material-ui/core/colors/grey'
import deepOrange from '@material-ui/core/colors/deepOrange'
import deepPurple from '@material-ui/core/colors/deepPurple'

// https://material-ui.com/customization/themes/#themes

const theme = createMuiTheme({
  palette: {
    // type: 'dark',
    primary: deepPurple,
    secondary: grey
  },
  typography: {
    fontFamily: 'Poppins, Roboto, Helvetica, sans-serif'
  },
  overrides: {
    MuiAppBar: {
      colorDefault: {
        backgroundColor: grey[50]
      }
    }
  }
})

export default theme
