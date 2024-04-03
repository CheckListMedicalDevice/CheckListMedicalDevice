import { Box } from "@mui/material";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";

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
