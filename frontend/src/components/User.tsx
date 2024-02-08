import { FC, ReactNode } from "react";
import { useThemeContext } from "../store/ThemeContext";
import { useAuthContext } from "../store/AuthContext";
import defaultImage from "../assets/defaultPicture.png";
import { Charts } from ".";

interface UserProps {
  children?: ReactNode;
  balance: number;
}

export const User: FC<UserProps> = ({ balance }) => {
  const themeContext = useThemeContext();
  const { header } = themeContext.specifies;
  const { user } = useAuthContext();

  return (
    <div
      className={`w-full h-2/3  mb-1 mt-4 bg-transparent flex overflow-hidden `}
    >
      <img
        src={defaultImage}
        className={`mt-10 ml-10 w-36 h-36 object-cover self-center -translate-y-12 `}
        style={{ borderRadius: "50%" }}
      />
      <div className="ml-16 mt-10 self-center -translate-y-12">
        <h1 className="text-3xl w-full">Personal data:</h1>
        <div className="mt-4">
          <p className="text-l">
            <strong>Email:</strong> {user && user.email}
          </p>
          <p className="text-l">
            <strong>Username:</strong> {user && user.username}
          </p>
        </div>
        <p className={`mt-10 text-l `}>Balance: </p>
        <p
          className={`${
            balance < 0 ? "text-red-600" : "text-green-600"
          } text-3xl pt-1 pl-1`}
        >
          {balance.toFixed(2)}
        </p>
      </div>
        <Charts />
    </div>
  );
};
