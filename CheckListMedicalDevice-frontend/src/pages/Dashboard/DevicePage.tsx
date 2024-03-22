import { Typography } from '@mui/material'
import React from 'react'
import NavbarDashboard from '../../components/NavDashboard'

type Props = {}

const DevicePage = (props: Props) => {
  return (
    <>
    <NavbarDashboard>
        <Typography variant="body1" color="initial">DevicePage</Typography>
    </NavbarDashboard>
    </>
  )
}

export default DevicePage