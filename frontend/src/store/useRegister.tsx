import { useState } from "react";
import { useAuthContext } from "./AuthContext";

interface useRegisterInterface {
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  isLoading: boolean;
  error: string;
}
interface CustomJson {
  email: string;
  token: string;
}
interface Message {
  message:string
}

export const useRegister: () => useRegisterInterface = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { dispatchLogin } = useAuthContext();

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const json : CustomJson | Message= await response.json();

      if (!response.ok ) {
        setIsLoading(false);
        if('message' in json){
          console.log(json.message);
          setError(json.message)
        }
      } else {
        // save the user to local storage
        localStorage.setItem("user", JSON.stringify(json));
        // update the auth context
        'message' in json || dispatchLogin({ type: "LOGIN", payload: {email:json.email, token:json.token} });
        // update loading state
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return { register, isLoading, error };
};
