import { NavigateFunction, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
type Props = {};

function HomePages({ }: Props) {
  const { removeUser } = useContext(AuthContext);
  const [message, setMessage] = useState<string>();

  const navigate: NavigateFunction = useNavigate();


  return (
    <Navbar>
      <>
        <h1>นี่คือโฮมเพจ</h1>
      </>

    </Navbar>
  );
}

export default HomePages;
