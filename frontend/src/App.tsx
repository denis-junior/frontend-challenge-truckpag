import "./App.css";
import { GeneralProvider } from "./context/GeneralContext";
import Main from "./pages/main/Main";

function App() {
  return (
    <GeneralProvider>
      <Main />
    </GeneralProvider>
  );
}

export default App;
