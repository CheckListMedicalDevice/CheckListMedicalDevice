import { Typography } from "@mui/material";
import Navbar from "../../components/Navbar";
import Realmap from "../../assets/Realmap.png"

type Props = {};

const MapFire = (props: Props) => {
  return (
    <>
      <Navbar>
        <Typography variant="body1" color="initial">
        <img style={{ height: "auto", width: "auto" }} src={Realmap} alt="logo" />
        </Typography>
      </Navbar>
    </>
  );
};

export default MapFire;
