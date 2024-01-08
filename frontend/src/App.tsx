import { BrowserRouter as Router, Route,Routes, Link } from "react-router-dom";
import {Home, SignupPage, LoginPage} from "./pages";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
  );
}

export default App;
