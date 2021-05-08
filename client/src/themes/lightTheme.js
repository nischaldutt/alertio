import { createMuiTheme } from "@material-ui/core/styles";

const light = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      light: "#FAFAFA",
      dark: "",
      main: "#ffffff", // white
      contrastText: "",
    },
    secondary: {
      main: "#1E70BF", // sky blue
    },
  },
  typography: {
    fontFamily: ['"Montserrat"', "Open Sans"].join(","),
  },
});

export default light;
