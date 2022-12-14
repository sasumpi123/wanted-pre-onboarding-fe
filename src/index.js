import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./pages/HomePage";
import TodoPage from "./pages/TodoPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "antd/dist/antd.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo" element={<TodoPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
