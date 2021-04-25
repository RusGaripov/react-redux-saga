import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import store from "./store";
import { SnackbarProvider } from "notistack";
import Slide from "@material-ui/core/Slide";

const app = (
  <SnackbarProvider
    maxSnack={3}
    anchorOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    TransitionComponent={Slide}
  >
    <Provider store={store}>
      <App />
    </Provider>
  </SnackbarProvider>
);

ReactDOM.render(app, document.querySelector("#root"));
