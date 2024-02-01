import { FC } from "react";
import { useThemeContext } from "../store/ThemeContext";
import { ToggleThemeButton } from "./ToggleThemeButton";
import { useAuthContext } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  pageName: string;
}

export const Navbar: FC<NavbarProps> = ({ pageName }) => {
  const { header, button } = useThemeContext().specifies;
  const { user, dispatchLogin } = useAuthContext();
  let userButton: String = "";
  const navigate = useNavigate();

  if (user) {
    userButton = "Logout";
  } else {
    userButton = pageName === "Login Page" ? "Signup" : "Login";
  }
  console.log(userButton);

  const click = () => {
    switch (userButton) {
      case "Login":
        navigate(`/${userButton.toLowerCase()}`);
        break;
      case "Signup":
        navigate(`/${userButton.toLowerCase()}`);
        break;
      case "Logout":
        dispatchLogin({ type: "LOGOUT", payload: null });
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={`w-full h-16 border-b-2 mb-10 flex items-center justify-end pl-5 pr-5 ${header}`}
    >
      <h1 className=" flex-grow justify-self-start">{pageName}</h1>
      {user && <p className="ml-auto text-xs">{user.email}</p>}
      <button
        onClick={click}
        className={`w-24 h-10 border-solid border-2 rounded-s rounded-e transition-all ease-in-out duration-300 hover:cursor-pointer ml-5 ${button}`}
      >
        {userButton}
      </button>
      <ToggleThemeButton className="ml-2" />
    </div>
  );
};
