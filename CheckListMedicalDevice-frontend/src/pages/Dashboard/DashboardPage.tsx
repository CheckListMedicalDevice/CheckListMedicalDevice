import { Box, Button, Container, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import NavbarDashboard from '../../components/NavDashboard'
import { AuthContext } from '../../contexts/AuthContext'



type Props = {}

function DashboardPage({}: Props) {
 
  return (
    <>
    <NavbarDashboard>
        <Typography variant="body1" color="initial">mong tum rai</Typography>
    </NavbarDashboard>
 
    </>
  )
}

export default DashboardPage