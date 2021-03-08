import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core/';
import { signIn, signOut, useSession } from 'next-auth/client';
import Avatar from './avatar.js';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CloseIcon from '@material-ui/icons/Close';
import MenuIcon from '@material-ui/icons/Menu';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import Link from 'next/link';
import { useRouter } from "next/router";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    border:'none',
  },
  grow: {
    flexGrow: 1
  },
  menuItem: {
    fontSize: 12,
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    border:'none',
  },
  closeMenuButton: {
    marginRight: 'auto',
    marginLeft: 0,
  },
}));

export default function MenuAppBar() {

  const [session, loading] = useSession();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen)
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <div>
      <List>
        <Link href="/" passHref shallow>
          <ListItem className={classes.listItem} selected={router.pathname == "/" ? true : false} button component="a" >
            <ListItemIcon style={{color:"#FFF"}}><FormatListBulletedIcon /></ListItemIcon>
            <ListItemText style={{color:"#FFF"}}>My tasks</ListItemText>
          </ListItem>
        </Link>
      </List>
    </div>
  );

  return (
    <>
      <AppBar elevation={0} position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            ToDo List
          </Typography>
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
            <div>
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
                onClose={handleClose}
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
                <MenuItem className={classes.menuItem} onClick={handleClose}>Profile</MenuItem>
                <MenuItem className={classes.menuItem} onClick={handleClose}>My account</MenuItem>
                <MenuItem className={classes.menuItem} onClick={() => signOut()}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {session && (
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              <IconButton onClick={handleDrawerToggle} className={classes.closeMenuButton}>
                <CloseIcon color="inherit"/>
              </IconButton>
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              className={classes.drawer}
              variant="permanent"
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div className={classes.toolbar} />
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      )}
    </>
  );
}
