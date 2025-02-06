import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot
import App from "./App";
import "./styles/global.css";

// Get the root element
const container = document.getElementById("root");

// Create a root
const root = createRoot(container);

// Render the app
root.render(<App />);
