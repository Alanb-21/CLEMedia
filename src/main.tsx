import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./styles/index.css";

// A standalone review build (VITE_ROUTER=hash) is served from an arbitrary
// sub-path with no server rewrites, so it routes on the hash instead.
// Production on Vercel always uses BrowserRouter.
const Router = import.meta.env.VITE_ROUTER === "hash" ? HashRouter : BrowserRouter;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Router>
        <App />
      </Router>
    </HelmetProvider>
  </React.StrictMode>
);
