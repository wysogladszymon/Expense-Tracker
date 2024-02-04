import { BrowserRouter as Router, Route,Routes, Navigate } from "react-router-dom";
import {Home, SignupPage, LoginPage} from "./pages";
import { useAuthContext } from "./store/AuthContext";
import { useEffect } from "react";
import { Notlogged } from "./pages/Notlogged";

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
          <Route path="/" element={user ? <Home/> : <Navigate to="/notlogged"/>} />
          <Route path="/notlogged" element={user ? <Navigate to="/"/> : <Notlogged/>} />
          <Route path="/signup" element={user ? <Navigate to="/"/> : <SignupPage />} />
          <Route path="/login" element={user ? <Navigate to="/"/> : <LoginPage />} />
        </Routes>
      </Router>
  );
}

export default App;
