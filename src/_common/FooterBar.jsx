import { Box } from '@mui/system'
import React from 'react'

const FooterBar = () => {
  return (
    <footer>
      <Box sx={{
        backgroundColor: "#009900",
        minHeight: '60px',
        color: 'white',
        position: "fixed",
        width: '100%',
        bottom: 0,
        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        boxShadow: '0px -2px 4px -1px rgb(0 0 0 / 20%), 0px -4px 5px 0px rgb(0 0 0 / 14%), 0px -1px 10px 0px rgb(0 0 0 / 12%)'
    
      }}>
        Route Delivery
      </Box>
    </footer >
  )
}

export default FooterBar