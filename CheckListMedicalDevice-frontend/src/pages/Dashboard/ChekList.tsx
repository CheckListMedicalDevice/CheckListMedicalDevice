import React from 'react'
import NavbarDashboard from '../../components/NavDashboard'
import Typography from '@mui/material/Typography'

type Props = {}

const CheckList = (props: Props) => {
  return (
    <>
    <NavbarDashboard>
        <Typography variant="body1" color="initial">CheckListPage</Typography>
    </NavbarDashboard>
    </>
  )
}

export default CheckList