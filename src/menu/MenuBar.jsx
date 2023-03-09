import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrgContext } from '../org/OrgContextProvider';
import { UserContext } from '../user/UserContextProvider';
import UserMenu from '../user/UserMenu';
import Spinner from '../_utils/Spinner';

const MenuBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate()
  const [isAdmin, setIsAdmin] = useState();
  const [pages, setPages] = useState();
  const [headerText, setHeaderText] = useState('route delivery');
  const [headerTarget, setHeaderTarget] = useState("/")
  const { user } = useContext(UserContext);
  const orgContext = useContext(OrgContext);
  //const pages = ['add new'];
  useEffect(() => {
    const pages = ['home'];
    
    if (orgContext && orgContext.org) {
      pages.push('dashboard', 'orgs',)
      setHeaderText(orgContext.org.name)
      setHeaderTarget('/dashboard')
    }
    else
    {
      setHeaderText('route delivery')
      setHeaderTarget('/')

    }
    pages.push('demo');
    if (isAdmin) { pages.push('admin') }
    setPages(pages)
  }, [isAdmin, orgContext])
  useEffect(() => {
    if (user && user.isAdmin) { setIsAdmin(true) }
  }, [user]);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    setAnchorElNav(null);
    switch (e.target.textContent) {
      case "demo":
        return navigate("/demo")
      case "home":
        return navigate("/")
      case "orgs":
        return navigate("/orgs")
      case "dashboard":
        return navigate("/dashboard")

      case "get started":
        return navigate("/start")
      case "moderate":
        return navigate("/moderate")
      case "admin":
        return navigate("/config")
      default:
        break;
    }
  };

  const onHeaderClick = () => {
    navigate(headerTarget)
  }

  if (!pages) return <Spinner />
  return (
    <AppBar position="static" sx={{ backgroundColor: "#009900" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            onClick={onHeaderClick}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {headerText}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#"
            onClick={onHeaderClick}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {headerText}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <UserMenu />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MenuBar;