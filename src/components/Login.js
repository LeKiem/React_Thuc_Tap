import { useState, useEffect, useContext } from "react";
import { loginApi } from "../service/UserService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { loginContext } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [loadingApi, setLoadingApi] = useState(false);

  //   useEffect(() => {
  //     let token = localStorage.getItem("token");
  //     if (token) {
  //       loginContext(email, res.token);
  //       navigate("/");
  //     }
  //   });

  const handleGoBack = () => {
    navigate("/");
  };

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Email/Password is required");
      return;
    }
    setLoadingApi(true);
    let res = await loginApi(email, password);
    if (res && res.token) {
      //   localStorage.setItem("token", res.token);
      loginContext(email, res.token);
      navigate("/");
    } else {
      if (res && res.status === 400) {
        toast.error(res.data.error);
      }
    }
    setLoadingApi(false);
  };
  return (
    <div className="login-container col-12 col-sm-4">
      <div className="title">Login</div>

      <div className="text">Email or username (eve.holt@reqres.in)</div>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <div className="input-2">
        <input
          type={isShowPassword === true ? "text" : "password"}
          placeholder="Password..."
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <i
          className={
            isShowPassword === true ? "fas fa-eye" : "fas fa-eye-slash"
          }
          onClick={() => setIsShowPassword(!isShowPassword)}
        ></i>
      </div>

      <button
        disabled={email && password ? false : true}
        className={email && password ? "active" : ""}
        onClick={() => handleLogin()}
      >
        {loadingApi && <i className="fa-solid fa-sync fa-spin"></i>}
        &nbsp; Login
      </button>
      <div className="back">
        {" "}
        <i class="fas fa-chevron-left"></i>
        <span onClick={() => handleGoBack()}>Go back</span>
      </div>
    </div>
  );
};

export default Login;
