import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { ProfileImageProvider } from "./contexts/ProfileImageContext.js";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <ProfileImageProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProfileImageProvider>
    </AuthProvider>
  </React.StrictMode>
);
