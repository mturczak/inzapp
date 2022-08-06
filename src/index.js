import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthLogin from "./Components/AuthLogin";
import ReservationPreview from "./Components/ReservationPreviev";
import NavBar from "./NavBar/NavBar";
import AuthRegister from "./Components/AuthRegister";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
  
    <Routes>
      <Route path="/" element={<Navigate to={"home"} />} />
      <Route path="authlogin" element ={<AuthLogin />}/>
      <Route path="authregister" element ={<AuthRegister />}/>
      <Route path="home" element={<App />} />
      <Route path="/reservations_preview" element={<ReservationPreview />} />

      {/* <Route path="admin" element={<Expenses />} /> */}
    </Routes>
    <NavBar />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
