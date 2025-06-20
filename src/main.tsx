import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store, { _persistStore } from "./redux-toolkit/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import MuiThemeProvider from "./mui-theme/MuiThemeProvider.tsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={_persistStore}>
        <BrowserRouter>
          <MuiThemeProvider>
            <App />
          </MuiThemeProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
