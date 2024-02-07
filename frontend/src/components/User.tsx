import { FC, ReactNode } from "react";
import { useThemeContext } from "../store/ThemeContext";
import { useAuthContext } from "../store/AuthContext";
import defaultImage from "../assets/defaultPicture.png";
interface UserProps {
  children?: ReactNode;
  balance: number;
}

export const User: FC<UserProps> = ({ balance }) => {
  const themeContext = useThemeContext();
  const {} = themeContext.specifies;
  const { user } = useAuthContext();

  return (
    <div className={`w-full h-1/2  mb-4 mt-4 bg-transparent flex`}>
      <img
        src={defaultImage}
        className={`mt-10 ml-10 w-36 h-36 object-cover `}
        style={{ "border-radius": "50%" }}
      />
      <div className="ml-16 mt-10">
        <h1 className="text-3xl">Personal data:</h1>
        <div className="mt-4">
          <p className="text-sm">
            <strong>Email:</strong> {user && user.email}
          </p>
          <p className="text-sm">
            <strong>Username:</strong> {user && user.username}
          </p>
        </div>
        <p className={`mt-10 text-l `}>
          Balance:{" "}
          <p className={`${balance < 0 ? "text-red-600" : "text-green-600"} text-2xl pt-1 pl-1`}>
            {balance.toFixed(2)}
          </p>
        </p>
      </div>
    </div>
  );
};
