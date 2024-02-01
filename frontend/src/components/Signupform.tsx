import { FC, useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { ThemeType, useThemeContext } from "../store/ThemeContext";
import { useRegister } from "../store/useRegister.tsx";
import { Error } from "./";

interface LayoutProps {}

export const Signupform: FC<LayoutProps> = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { register, isLoading, error } = useRegister();

  const handleClick = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  //handle theme
  const { theme, specifies } = useThemeContext();

  const eyeStyles =
    "absolute w-5 h-5 mt-15 z-1000 bg-transparent hover:cursor-pointer right-3 top-1/2 bottom-1/2 transform  -translate-y-1/2";
  const eye = isPasswordVisible ? (
    <VscEye
      className={eyeStyles}
      color={theme == ThemeType.Light ? "black" : "white"}
      onClick={handleClick}
      id="togglePassword"
    ></VscEye>
  ) : (
    <VscEyeClosed
      className={eyeStyles}
      color={theme == ThemeType.Light ? "black" : "white"}
      onClick={handleClick}
      id="togglePassword"
    ></VscEyeClosed>
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try{
      await register(username, email, password);
      setEmail("");
      setUsername("");
      setPassword("");
    }
    catch(err : any){
      console.log(err.message);
    }
  };

  return (
    <form
      className={`border-solid border-2 relative flex flex-col max-w-96 mx-auto rounded-s rounded-e p5 ${specifies.container}`}
      onSubmit={handleSubmit}
    >
      <h1
        className={`pl-6 pb-4 border-0 border-b-2 w-full pt-4 text-2xl ${specifies.header}`}
      >
        Signup User
      </h1>
      <label className={`ml-6 mt-3 ${specifies.label}`}>Email adress</label>
      <input
        className={`p-2 h-full box-border mr-6 ml-6 mt-2 mb-3 flex justify-center overflow-hidden relative border-2 border-solid rounded-s rounded-e ${specifies.input}`}
        autoCorrect="off"
        autoCapitalize="off"
        value={email}
        type="text"
        onChange={(e) => setEmail(e.target.value)}
      />

      <label className={`ml-6 mt-3 ${specifies.label}`}>Username</label>
      <input
        className={`p-2 h-full box-border mr-6 ml-6 mt-2 mb-3 flex justify-center overflow-hidden relative border-2 border-solid rounded-s rounded-e ${specifies.input}`}
        autoCorrect="off"
        autoCapitalize="off"
        value={username}
        type="text"
        onChange={(e) => setUsername(e.target.value)}
      />
      <label className={`ml-6 mt-2 ${specifies.label}`}>Password</label>
      <div className="relative mr-6 ml-6 mt-2 mb-3">
        <input
          className={`p-2 pr-9 w-full h-full box-border flex justify-center overflow-hidden relative border-2 border-solid rounded-s rounded-e ${specifies.input}`}
          autoCorrect="off"
          autoCapitalize="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={isPasswordVisible ? "text" : "password"}
        ></input>{" "}
        {eye}
      </div>
      <Error
        theme={theme}
        className="justify-center mb-4 text-center self-center"
      >
        {!error ? <br /> : error}
      </Error>
      <button
        className={`clear mb-5 w-24 h-10 self-center border-solid  border-2 hover:-translate-y-1 rounded-s rounded-e transition ease-in-out duration-300 hover:cursor-pointer hover:transition-transform hover:duration-300 hover:ease-in-out  ${specifies.button}`}
      >
        Sign Up
      </button>
    </form>
  );
};
