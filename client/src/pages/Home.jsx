import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Outlet, useLoaderData } from 'react-router-dom'
import FolderList from '../components/folders/FolderList'
// import Notification from '../components/Notification'

import UserMenu from '../components/UserMenu'

function Home() {
  const { folders } = useLoaderData()

  return (
    <>
      <Typography variant="h4" sx={{ mb: '20px' }}>
        NOTE APP
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'right',
          mb: '10px',
        }}
      >
        <UserMenu />
        {/* <Notification /> */}
      </Box>

      <Grid
        container
        sx={{ height: '50vh', boxShadow: '0 0 15px rgb(193 193 193 / 60%)' }}
      >
        <Grid item xs={3} sx={{ height: '100%' }}>
          <FolderList folders={folders} />
        </Grid>
        <Grid item xs={9} sx={{ height: '100%' }}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  )
}

export default Home
