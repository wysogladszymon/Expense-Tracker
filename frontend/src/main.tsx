import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeContextProvider } from "./store/ThemeContext.tsx";
import { AuthContextProvider } from "./store/AuthContext.tsx";
import { FinanseInputContextProvider } from "./store/FinanseInputsContext";
import { FetchedDataProvider } from "./store/FetchedDataContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeContextProvider>
      <AuthContextProvider>
        <FinanseInputContextProvider>
          <FetchedDataProvider>
            <App />
          </FetchedDataProvider>
        </FinanseInputContextProvider>
      </AuthContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
