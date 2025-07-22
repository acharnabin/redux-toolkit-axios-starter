import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store, { _persistStore } from "./redux-toolkit/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import MuiThemeProvider from "./mui-theme/MuiThemeProvider.tsx";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      retry:false,
      
    }
  }
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PersistGate persistor={_persistStore}>
          <BrowserRouter>
            <MuiThemeProvider>
              <App />
              <ReactQueryDevtools initialIsOpen={false} />
            </MuiThemeProvider>
          </BrowserRouter>
        </PersistGate>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
