import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import MyState from "./context/myState.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <StrictMode>
      <MyState>
        <App />
        <Toaster position="bottom-center" />
      </MyState>
    </StrictMode>
  </BrowserRouter>
);
