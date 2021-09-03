import React from "react";
import { CssBaseline, createTheme } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { ThemeProvider } from "@material-ui/styles";

function Theme({ children }) {
  const appTheme = createTheme({
    palette: {
      type: "light",
      primary: {
        main: green["A700"],
      },
      secondary: {
        main: "#ccffd2",
      },
    },
    typography: {
      fontFamily: ["Montserrat", "sans-serif"].join(","),
    },
  });
  return (
    <>
      <ThemeProvider theme={appTheme}>
        <CssBaseline></CssBaseline>
        {children}
      </ThemeProvider>
    </>
  );
}

export default Theme;
