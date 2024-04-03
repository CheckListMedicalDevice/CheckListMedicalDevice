import { Box, Button, Container, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import NavbarDashboard from "../../components/NavDashboard";
import { AuthContext } from "../../../contexts/AuthContext";

type Props = {};

function DashboardPage({}: Props) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <NavbarDashboard>
          <Typography variant="body1" color="initial">
            mong tum rai
          </Typography>
        </NavbarDashboard>
      )}
    </>
  );
}

export default DashboardPage;
