import "./App.css";
import { AuthProvider } from "../contexts/AuthContext";

import RouterApp from "./RouterApp";

function App() {
  return (
    <>
      <AuthProvider>
        <RouterApp />
      </AuthProvider>
    </>
  );
}

export default App;
