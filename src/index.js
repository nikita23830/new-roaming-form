import React from "react";
import { render } from "react-dom";
import { Provider } from 'mobx-react';
import { SnackbarProvider } from 'notistack';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";

import App from "./App";
import store from './store';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: purple[700],
      main: purple[800],
      dark: purple[900],
      white: "#fff"
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d"
    }
  }
});

render(
  <Provider store={store}>
    <SnackbarProvider maxSnack={3}>
      <MuiThemeProvider theme={theme}>
        <App store={store} />
      </MuiThemeProvider>
    </SnackbarProvider>
  </Provider>,
  document.getElementById("root")
);
