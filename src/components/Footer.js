import React from 'react'
import {Box,Stack,Typography} from '@mui/material'

const Footer = () => {
  return (
    <Box mt='80px' width={'100%'} bgcolor={'#66b178'}>
      <Stack gap='40px' alignItems='center' px='40px' pt='24px' >
        <Typography variant='h5' pb='40px' mt='20px' color={'#fff'}>Made with ❤️ by Me :)</Typography>
      </Stack>
    </Box>
  )
}

export default Footer