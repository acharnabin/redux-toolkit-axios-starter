import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store, { _persistStore } from "./redux-toolkit/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import MuiThemeProvider from "./mui-theme/MuiThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      
      <PersistGate persistor={_persistStore}>
        <MuiThemeProvider>
  <App />
        </MuiThemeProvider>
        
      
      </PersistGate>
    </Provider>
  </StrictMode>
);
