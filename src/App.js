// import logo from "./logo.svg";
import { useState } from "react";
import "./App.scss";
import Header from "./components/Header";

import Container from "react-bootstrap/Container";
import { ToastContainer, toast } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { useContext, useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";

// import { Row } from "react-bootstrap";

function App() {
  const { user, loginContext } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      loginContext(
        localStorage.getItem("email"),
        localStorage.getItem("token")
      );
    }
  }, []);
  return (
    <>
      <div className="app-container">
        <Header />
        <Container>
          <AppRoutes />
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
