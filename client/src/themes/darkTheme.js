import { createMuiTheme } from "@material-ui/core/styles";

const dark = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      light: "#212121",
      main: "#212121",
    },
    secondary: {
      main: "#ffffff",
    },
  },
  typography: {
    fontFamily: ['"Montserrat"', "Open Sans"].join(","),
  },
});

export default dark;
