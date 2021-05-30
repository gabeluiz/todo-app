
import React, { useState } from 'react';
import PropTypes from 'prop-types';

//User SESSION
import { signIn, signOut, useSession } from 'next-auth/client';

import {
  makeStyles,
  useTheme
} from '@material-ui/core/styles';
import {
  Typography,
  AppBar,
  Hidden,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
  Button,
  Divider,
  ListItemIcon,
  Drawer,
  Fade,
} from '@material-ui/core/';
import Avatar from './avatar.js';
import NewListButton from './new-list-button';
import useFetch from '../hooks/useFetch';
import { useRouter } from "next/router";

//ICONS
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import ListList from './list-list.js';

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
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
  toolbar:{
    display:'flex',
    justifyContent:'center',
    minHeight:theme.mixins.toolbar,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.background.default
  }, Paper: {
    width: drawerWidth,
    border: 'none',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  menuItem: {
    fontSize: 12,
  },
  grow: {
    flexGrow: 1,
  },
}));

export default function Header(props) {

  const { data, mutate } = useFetch('/api/list');
  const [session, loading] = useSession();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const theme = useTheme();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };


  const container = window !== undefined ? () => window().document.body : undefined;

  //CENTRALIZAR DIV DE LOADING PARA FICAR BONITO
  if (!data) return <div>Loading...</div>

  const getListName = () => {
    const indexListSelected = data.data.filter(el => el._id === router.query.id);
    return indexListSelected[0] ? indexListSelected[0].list : "";
  }



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
                {getListName()}
              </Typography>
            </>
          )}
          <div className={classes.grow} />
          {!session && <> {' '}
            <Button
              startIcon={<AccountCircle />}
              variant="outlined"
              color="inherit"
              onClick={() => signIn('google')}
            >
              Login
            </Button>
          </>}
          {session && (
            <>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar></Avatar>
              </IconButton>
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
                <MenuItem className={classes.menuItem} onClick={handleCloseMenu}>Profile</MenuItem>
                <MenuItem className={classes.menuItem} onClick={handleCloseMenu}>My account</MenuItem>
                <MenuItem className={classes.menuItem} onClick={() => signOut({ callbackUrl: "/" })}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
      {session && (
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              <div className={classes.toolbar} >
                <NewListButton />
              </div>
              <Divider />
              <ListList data={data} />
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              <div className={classes.toolbar} >
                <NewListButton />
              </div>
              <Divider />

              <ListList data={data} />
            </Drawer>
          </Hidden>
        </nav>
      )
      }
    </>
  );
}

Header.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
