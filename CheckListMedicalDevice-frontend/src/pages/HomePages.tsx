import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useState } from "react";

type Props = {};

function HomePages({}: Props) {
  const { user, removeUser } = useContext(AuthContext);
  const [message, setMessage] = useState<string>();

  const navigate: NavigateFunction = useNavigate();

  const logout = () => {
    removeUser();
    return navigate("/login");
  };

  return (
    <>
      ยินดีต้อนรับคุณ {user?.firstName} {user?.lastName}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={logout}
      >
        Logout
      </Button>
    </>
  );
}

export default HomePages;
