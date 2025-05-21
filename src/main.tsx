import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import 'antd/dist/reset.css';
import { ThemeProvider } from './contexts/ThemeContext.tsx';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
