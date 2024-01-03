import { FC, useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

interface LayoutProps {}

export const Signupform: FC<LayoutProps> = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleClick = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const eyeStyles =
    "absolute w-5 h-5 mt-15 z-1000 bg-white hover:cursor-pointer right-3 top-1/2 bottom-1/2 transform  -translate-y-1/2";
  const eye = isPasswordVisible ? (
    <VscEye
      className={eyeStyles}
      onClick={handleClick}
      id="togglePassword"
    ></VscEye>
  ) : (
    <VscEyeClosed
      className={eyeStyles}
      onClick={handleClick}
      id="togglePassword"
    ></VscEyeClosed>
  );
  const handleSubmit = () => {};

  return (
    <form
      className="border-solid border-2 border-gray-600 relative flex flex-col max-w-96 mx-auto bg-slate-50 rounded-s rounded-e"
      onSubmit={handleSubmit}
    >
      <h1 className="pl-6 pb-4 border-0 border-b-2  w-full pt-4 text-2xl bg-gray-300">
        Login User
      </h1>
      <label className="ml-6 mt-3">Email adress</label>
      <input
        className=" bg-white p-2 h-full box-border mr-6 ml-6 flex justify-center overflow-hidden relative mt-2  border-2 border-solid border-gray-300 rounded-s rounded-e"
        autoCorrect="off"
        autoCapitalize="off"
        value={email}
        type="text"
        onChange={(e) => setEmail(e.target.value)}
      />

      <label className="ml-6 mt-3">Username</label>
      <input
        className=" bg-white p-2 h-full box-border mr-6 ml-6 flex justify-center overflow-hidden relative mt-2 mb-3  border-2 border-solid border-gray-300 rounded-s rounded-e"
        autoCorrect="off"
        autoCapitalize="off"
        value={username}
        type="text"
        onChange={(e) => setUsername(e.target.value)}
      />
      <label className="ml-6">Password</label>
      <div className="relative mr-6 ml-6 mt-2 mb-3">
        <input
          className=" bg-white p-2 pr-9  box-border flex justify-center overflow-hidden relative  w-full border-2 border-solid border-gray-300 rounded-s rounded-e"
          autoCorrect="off"
          autoCapitalize="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={isPasswordVisible ? "text" : "password"}
        ></input>{" "}
        {eye}
      </div>
      <button className="mb-5 clear w-24 h-10 self-center border-solid border-slate-200 border-2 hover:-translate-y-1 rounded-s rounded-e transition ease-in-out duration-300 hover:cursor-pointer hover:transition-transform hover:duration-300 hover:ease-in-out hover:border-slate-300 ">
        Log in
      </button>
    </form>
  );
};
