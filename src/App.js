import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthLogin from "./Components/AuthLogin";
import AuthRegister from "./Components/AuthRegister";
import ReservationPreview from "./Components/ReservationPreviev";
import { AuthContext } from "./helpers/AuthContext";
import Home from "./Home";
import NavBar from "./NavBar/NavBar";

const App = () => {
  const [authState, setAuthState] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch("/reservation/auth", {
        headers: {
          accessToken: sessionStorage.getItem("accessToken"),
        },
      });
      // console.log(response);
      const json = await response.json();

      if (json.error) {
        setAuthState({});
      } else {
        setAuthState({
          accessToken: sessionStorage.getItem("accessToken"),
          id_clients: json.id_clients,
          role: json.role,
        });
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <BrowserRouter>
        <NavBar />
        <a>{authState.role}</a>
        <Routes>
          <Route path="/" element={<Navigate to={"authregister"} />} />
          <Route path="authlogin" element={<AuthLogin />} />
          <Route path="authregister" element={<AuthRegister />} />
          <Route path="home" element={<Home />} />
          <Route
            path="/reservations_preview"
            element={<ReservationPreview />}
          />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
