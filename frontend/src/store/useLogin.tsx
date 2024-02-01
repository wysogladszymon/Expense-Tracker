import { useState } from "react";
import { useAuthContext } from "./AuthContext";

interface useLoginInterface {
  login: (emailOrUsername: string, password: string) => Promise<void>;
  isLoading: boolean;
  error: string;
}
interface CustomJson {
  email: string;
  token: string;
}
interface Message {
  message: string;
}

export const useLogin: () => useLoginInterface = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { dispatchLogin } = useAuthContext();

  const login = async (emailOrUsername: string, password: string) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrUsername, password }),
      });

      const json: CustomJson | Message = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        if ("message" in json) {
          setError(json.message);
          throw Error(json.message);
        }
      } else {
        // save the user to local storage
        localStorage.setItem("user", JSON.stringify(json));
        // update the auth context
        "message" in json ||
          dispatchLogin({
            type: "LOGIN",
            payload: { email: json.email, token: json.token },
          });
        // update loading state
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log(error.message);
      throw Error(error.message);
    }
  };
  return { login, isLoading, error };
};
