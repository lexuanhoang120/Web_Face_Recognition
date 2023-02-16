import "./common/assets/style/index.scss";
import "./modules/_assets/styles/index.scss";

import React from "react";
import ReactDOM from "react-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";

import reportWebVitals from "./reportWebVitals";
import App from "./App";
import { store, persistor } from "@/store";
import QueryClientProvider from "@/common/context/react-query";
import client from "@/utils/react-query";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={client}>
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <App />
          </SnackbarProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
