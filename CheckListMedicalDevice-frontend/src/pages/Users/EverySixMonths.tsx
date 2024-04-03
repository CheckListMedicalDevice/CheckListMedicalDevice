import { Typography } from "@mui/material";
import React from "react";
import Navbar from "../../components/Navbar";

type Props = {};

const EverySixMonths = (props: Props) => {
  return (
    <>
      <Navbar>
        <Typography variant="body1" color="initial">
          EverySixMonths
        </Typography>
      </Navbar>
    </>
  );
};

export default EverySixMonths;
