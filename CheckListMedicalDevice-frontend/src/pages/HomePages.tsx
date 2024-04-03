import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
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
    <Navbar>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">ยินดีต้อนรับคุณ {user?.firstName} {user?.lastName}</h5>
                <p className="card-text">{message}</p>
              </div>
              <div className="card-footer">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={logout}
                >
                  ออกจากระบบ
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Navbar>
  );
}

export default HomePages;
