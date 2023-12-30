"use client";

import { FC, ReactNode, useState } from "react";
import "./Signupform.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";

interface LayoutProps {}

const Signupform: FC<LayoutProps> = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleClick = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const handleSubmit = () =>{

  }
  return (
    <form className="Signupform" onSubmit={handleSubmit}>
      <h1 className="loginTitle">Signup new User</h1>
      <label>Email</label>
      <div className="email">
        <input
          autoCorrect="off"
          autoCapitalize="off"
          value={email}
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <label>Username</label>
      <div className="username">
        <input
          autoCorrect="off"
          autoCapitalize="off"
          value={username}
          type="text"
          onChange={(e) => setUsername(e.target.value)}
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
      <button>Sign up</button>
    </form>
  );
};

export default Signupform;
