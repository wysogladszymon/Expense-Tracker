import { BrowserRouter as Router, Route,Routes, Link } from "react-router-dom";
import {Home, SignupPage, LoginPage} from "./pages";
import { useAuthContext } from "./store/AuthContext";
import { useEffect,useState } from "react";

function App() {
  const {user, dispatchLogin} = useAuthContext();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const newuser = userData && JSON.parse(userData);
    newuser && dispatchLogin({type:"LOGIN", payload : newuser})


  }, []);

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/signup" element={user ? <Home/> : <SignupPage />} />
          <Route path="/login" element={user ? <Home/> : <LoginPage />} />
        </Routes>
      </Router>
  );
}

export default App;
