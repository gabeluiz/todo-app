import React, { useState } from 'react';

//User SESSION
import { signIn, signOut, useSession } from 'next-auth/client';

import {
  makeStyles
} from '@material-ui/core/styles';
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
  Button,
  Divider,
  ListItemIcon,
  Fade,
  Tooltip,
  Switch
} from '@material-ui/core/';
import Avatar from './avatar.js';
import useDarkMode from 'use-dark-mode';

//Icons
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import DrawerLeft from './drawer.js';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  menuItem: {
    fontSize: 12,
  },
  grow: {
    flexGrow: 1,
  },
}));

export default function Header() {

  const [session, loading] = useSession();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { value: isDark, toggle: toggleDarkMode } = useDarkMode();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="transparent" elevation={0}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          {session && (
            <>
              <Typography variant="h6" noWrap>
                {/* {getListName()} */}
              </Typography>
            </>
          )}
          <div className={classes.grow} />
          <Tooltip title="Toggle light / dark theme">
            <Switch
              onChange={toggleDarkMode}
              name="isDark"
              inputProps={{ 'aria-label': 'primary checkbox' }}
              checked={isDark}
            />
          </Tooltip>
          {!session && <> {' '}
            <Button
              startIcon={<AccountCircle />}
              variant="outlined"
              color="inherit"
              onClick={() => signIn("google")}
            >
              Login
            </Button>
          </>}
          {session && (
            <>
              <Button
                endIcon={<ExpandMoreIcon />}
                onClick={handleMenu}
                size="small"
                className={classes.menuItem}
              >
                <Avatar />
                <Typography variant="inherit" noWrap>
                  {session.user.name}
                </Typography>
              </Button>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleCloseMenu}
                TransitionComponent={Fade}
                className={classes.menu}
              >
                <MenuItem className={classes.menuItem}>
                  <ListItemIcon>
                    <Avatar />
                  </ListItemIcon>
                  <Typography variant="inherit" noWrap>
                    {session.user.name}
                    <br />
                    {session.user.email}
                  </Typography>
                </MenuItem>
                <Divider />
                {/* <MenuItem className={classes.menuItem} onClick={handleCloseMenu}>Profile</MenuItem>
                <MenuItem className={classes.menuItem} onClick={handleCloseMenu}>My account</MenuItem> */}
                <MenuItem className={classes.menuItem} onClick={() => signOut({ callbackUrl: "/" })}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
      {session && (
        <DrawerLeft mobileOpen={mobileOpen} handleDrawerToggle={() => setMobileOpen(!mobileOpen)} />
      )
      }
    </>
  );
}

