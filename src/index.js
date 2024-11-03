
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";

import AdminLayout from "setup/Admin.js";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/dashboard.scss?v=1.3.1";
import "perfect-scrollbar/css/perfect-scrollbar.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <Routes>
      <Route path="/admin/*" element={<AdminLayout />} />
      <Route path="*" element={<Navigate to="/admin/overview" replace />} />
    </Routes>
  </HashRouter>
);
