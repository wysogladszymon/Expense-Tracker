"use client";

import { FC, ReactNode, useState } from "react";
import "./Loginform.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";

interface LayoutProps {}

const Loginform: FC<LayoutProps> = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleClick = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const handleSubmit = () =>{

  }
  return (
    <form className="LoginForm" onSubmit={handleSubmit}>
      <h1 className="loginTitle">Login User</h1>
      <label>Username or email adress</label>
      <div className="email">
        <input
          autoCorrect="off"
          autoCapitalize="off"
          value={email}
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <label>Password</label>
      <div className="password">
        <input
          autoCorrect="off"
          autoCapitalize="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={isPasswordVisible ? "text" : "password"}
        ></input>{" "}
        <FontAwesomeIcon
          className="eye"
          onClick={handleClick}
          icon={faEye}
          id="togglePassword"
        />
      </div>
      <button>Log in</button>
    </form>
  );
};

export default Loginform;
