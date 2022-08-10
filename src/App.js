import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthLogin from "./Components/AuthLogin";
import AuthRegister from "./Components/AuthRegister";
import ReservationPreview from "./Components/ReservationPreviev";
import ClientsPreview from "./Components/ClientsPreview"
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
          name: json.name,
        });
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<Navigate to={"authregister"} />} />
          <Route path="authlogin" element={<AuthLogin />} />
          <Route path="authregister" element={<AuthRegister />} />
          <Route path="home" element={<Home />} />
          <Route
            path="/reservations_preview"
            element={<ReservationPreview />}
          />
          <Route
            path="/clients_preview"
            element={<ClientsPreview />}
          />
        </Routes>
      </BrowserRouter>
      <footer>
        <p className="footer name">Miłosz Turczak</p>
        <p className="footer praca">
          <strong>Praca Inżynierska:</strong> Aplikacja webowa wspomagająca pracę restauracji
        </p>
        <p className="footer role">Role: {authState.role}</p>
      </footer>
    </AuthContext.Provider>
  );
};

export default App;
