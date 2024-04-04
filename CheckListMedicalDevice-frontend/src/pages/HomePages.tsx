import { NavigateFunction, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { createTheme, ThemeProvider } from "@mui/material";

const defaultTheme = createTheme({
  palette: {
    background: {
      default: "#E7EFF8",
    },
  },
  typography: {
    fontFamily: ["-apple-system", "sans-serif"].join(","),
  },
});

type Props = {};

function HomePages({ }: Props) {
  const { removeUser } = useContext(AuthContext);
  const [message, setMessage] = useState<string>();

  const navigate: NavigateFunction = useNavigate();


  return (
    <ThemeProvider theme={defaultTheme}>
      <Navbar>
        <>
          <h1>นี่คือโฮมเพจ</h1>
        </>
      </Navbar>
    </ThemeProvider>

  );
}

export default HomePages;
