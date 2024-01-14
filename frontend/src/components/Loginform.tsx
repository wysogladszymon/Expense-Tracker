import { FC, useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { ThemeType, useThemeContext } from "../store/ThemeContext";

interface LayoutProps {}

export const Loginform: FC<LayoutProps> = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleClick = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  //handle theme
  const {theme, specifies } = useThemeContext();

  const eyeStyles =
    "bg-transparent absolute w-5 h-5 mt-15 z-1000 hover:cursor-pointer right-3 top-1/2 bottom-1/2 transform  -translate-y-1/2";
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
  //have to finish
  const handleSubmit = () => {};

  return (
    <>
      <form
        className={`border-solid border-2 relative flex flex-col max-w-96 mx-auto rounded-s rounded-e p5 ${specifies.container}`}
        onSubmit={handleSubmit}
      >
        <h1
          className={`pl-6 pb-4 border-0 border-b-2 w-full pt-4 text-2xl ${specifies.header}`}
        >
          Login User
        </h1>
        <label className={`ml-6 mt-3 ${specifies.label}`}>
          Username or email adress
        </label>
        <input
          className={`p-2 h-full box-border mr-6 ml-6 mt-2 mb-3 flex justify-center overflow-hidden relative border-2 border-solid rounded-s rounded-e ${specifies.input}`}
          autoCorrect="off"
          autoCapitalize="off"
          value={email}
          type="text"
          onChange={(e) => setEmail(e.target.value)}
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
        <button
          className={`clear mb-5 w-24 h-10 self-center border-solid  border-2 hover:-translate-y-1 rounded-s rounded-e transition ease-in-out duration-300 hover:cursor-pointer hover:transition-transform hover:duration-300 hover:ease-in-out  ${specifies.button}`}
        >
          Log in
        </button>
      </form>
      <div className=' transform translate-x-7'></div>
    </>
  );
};
