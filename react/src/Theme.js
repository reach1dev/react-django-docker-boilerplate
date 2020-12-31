const { createMuiTheme } = require("@material-ui/core");

const theme = createMuiTheme({
  typography: {
    h3: {
      fontFamily: "Great Vibes"
    },
    h4: {
      fontFamily: "Great Vibes",
    },
    h5: {
      fontFamily: "Roboto",
      fontWeight: 500
    },
    h6: {
      fontFamily: "Roboto",
      fontSize: 18
    },
    button: {
      fontFamily: "Roboto",
      textTransform: "capitalize"
    },
    caption: {
      fontFamily: "Roboto",
      fontSize: 15
    }
  },

  palette: {
    primary: {
      main: '#17a05d'
    },
    secondary: {
      main: '#5684FF'
    },
    text: {
      secondary: '#888'
    }
  }
});

export default theme;