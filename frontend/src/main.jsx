import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3200,
        style: {
          background: "#17251d",
          color: "#eef5ef",
          border: "1px solid rgba(134, 239, 172, 0.18)",
          borderRadius: "14px",
          boxShadow: "0 16px 40px rgba(0, 0, 0, 0.24)",
          fontSize: "14px",
        },
        success: {
          iconTheme: {
            primary: "#86efac",
            secondary: "#17251d",
          },
        },
      }}
    />
  </BrowserRouter>
);