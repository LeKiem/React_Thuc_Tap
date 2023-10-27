import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  return (
    <div className="login-container col-12 col-sm-4">
      <div className="title">Login</div>

      <div className="text">Email or username</div>
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
      >
        Login
      </button>
      <div className="back">
        {" "}
        <i class="fas fa-chevron-left"></i>Go back
      </div>
    </div>
  );
};

export default Login;
