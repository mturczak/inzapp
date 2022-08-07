import Home from "./Home";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthLogin from "./Components/AuthLogin";
import AuthRegister from "./Components/AuthRegister";
import ReservationPreview from "./Components/ReservationPreviev";
import NavBar from "./NavBar/NavBar";

const App = () => {
  return (
    <BrowserRouter>
   <NavBar />
   <a>{sessionStorage.getItem("role")}</a>
    <Routes>
      <Route path="/" element={<Navigate to={"authregister"} />} />
      <Route path="authlogin" element={<AuthLogin />} />
      <Route path="authregister" element={<AuthRegister />} />
      <Route path="home" element={<Home />} />
      <Route path="/reservations_preview" element={<ReservationPreview />} />

      
    </Routes>
   
  </BrowserRouter>
  )
};

export default App;
