import { Typography } from "@mui/material";
import React from "react";
import Navbar from "../../components/Navbar";

type Props = {};

const CheckPerDay = (props: Props) => {
  return (
    <>
      <Navbar>
        <Typography variant="body1" color="initial">
          CheckPerDay
        </Typography>
      </Navbar>
    </>
  );
};

export default CheckPerDay;
