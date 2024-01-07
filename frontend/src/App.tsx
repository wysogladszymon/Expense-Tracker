import { Loginform, Signupform } from "./components";
import { ThemeContextProvider } from "./store/ThemeContext";

function App() {
  return (
    <ThemeContextProvider>
      <Loginform />
      <Signupform />
    </ThemeContextProvider>
  );
}

export default App;
