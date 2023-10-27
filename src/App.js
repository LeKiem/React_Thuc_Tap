// import logo from "./logo.svg";
import { useState } from "react";
import "./App.scss";
import Header from "./components/Header";
import TableUsers from "./components/TableUsers";
import Container from "react-bootstrap/Container";
import { ToastContainer, toast } from "react-toastify";
import Home from "./components/Home";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import { UserContext } from "./context/UserContext";
import { useContext, useEffect } from "react";

// import { Row } from "react-bootstrap";

function App() {
  const { user, LoginContext } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      LoginContext(
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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<TableUsers />} />
            <Route path="/login" element={<Login />} />
          </Routes>
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
