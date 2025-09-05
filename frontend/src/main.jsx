import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import AddSchool from "./pages/AddSchool.jsx";
import ShowSchools from "./pages/ShowSchools.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/add-school" element={<AddSchool />} />
      <Route path="/show-schools" element={<ShowSchools />} />
    </Routes>
  </BrowserRouter>
);
