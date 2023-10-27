import { Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Home from "../components/Home";
import PrivateRoute from "./PrivateRoute";
import TableUsers from "../components/TableUsers";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/users"
          element={
            <PrivateRoute>
              <TableUsers />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};
export default AppRoutes;
