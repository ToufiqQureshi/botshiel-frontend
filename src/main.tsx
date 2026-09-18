import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// Set initial theme class
const savedTheme = localStorage.getItem('bot-shield-theme') || 'dark';
document.documentElement.classList.add(savedTheme);

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
