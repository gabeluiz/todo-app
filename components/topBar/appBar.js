import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { signIn, signOut, useSession } from 'next-auth/client';
import Button from '@material-ui/core/Button';
import Avatar from './avatar.js';
import Divider from '@material-ui/core/Divider';
import Fade from '@material-ui/core/Fade';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InvertColorsIcon from '@material-ui/icons/InvertColors';

const useStyles = makeStyles((theme) => ({
 appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  grow: {
    flexGrow: 1
  },
  menu: {
    "& .MuiPaper-root": {
      backgroundColor: theme.palette.primary.main,
    }
  },
  menuItem: {
    fontSize:12,
  },
  title: {
    flexGrow: 1,
  },

}));

export default function MenuAppBar() {

  const [session, loading] = useSession();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [openDrawer, setOpernDrawer] = React.useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawer = () => {
    if(openDrawer){
      setOpernDrawer(false);
    }else{
      setOpernDrawer(true);
    }
    
  };

  return (
      <AppBar color='primary' className={classes.appBar}>
        <Toolbar>
          {/* <IconButton onClick={handleDrawer} edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <IconButton edge="start" color="inherit" aria-label="menu">
            <InvertColorsIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            ToDo-List
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
  );
}
