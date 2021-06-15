import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { useRouter } from "next/router";

//Material-ui-components
import {
    Divider,
    Drawer,
    Hidden,
    IconButton,
    FormHelperText,
    FormControlLabel,
    Switch,
    Typography,
    Button,
    Dialog,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Menu,
    MenuItem,
    TextField,
    DialogContentText,
    Badge
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

//Icons
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import MoreVertIcon from '@material-ui/icons/MoreVert';

//Constants
import { URL_API_LIST } from '../lib/constants';

//Fetch data
import useFetch from '../hooks/useFetch';
import Footer from './footer';

const drawerWidth = 280;

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    dialog: {
        position: 'absolute',
        left: 10,
        top: 50
    },
});

const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
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
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
        width: '100%'
    },
    iconButton: {
        padding: 10,
    },
    paperInput: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        border: 'none',
        boxShadow: 'rgba(0, 0, 0, 0.3) 0 1px 3px',
    },
    helptext: {
        color: theme.palette.error.light,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'center',
        minHeight: theme.mixins.toolbar,
    },
    borderR: {
        borderRight: `3px solid ${theme.palette.primary.main}`,
    },
    badge: {
        marginRight: 15,
    },
    switchMain: {
        marginTop: 15,
    }
}));

export default function DrawerLeft(props) {

    const { data, error, mutate } = useFetch('/api/list');

    const classes = useStyles();
    const theme = useTheme();
    const { window, mobileOpen, handleDrawerToggle } = props;
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    //# DELETAR TASK
    const handleDelete = async (_id) => {
        const res = await fetch(URL_API_LIST + "/" + _id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        setAnchorEl(false);
        mutate();
    }

    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    //INCLUIR ITEM
    const onSubmit = async (dados, e) => {

        const res = await fetch(URL_API_LIST, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dados)
        })

        setOpen(false);
        mutate();

        e.target.reset();
    }

    const container = window !== undefined ? () => window().document.body : undefined;

    if (error) return <div>Failed to load list</div>
    if (!data) return <div>Loading...</div>


    const listMenu = (
        <>
            <List dense={true}>
                <Link as={`/`} href="/">
                    <ListItem selected={router.asPath == "/" ? true : false} button className={router.asPath == "/" ? classes.borderR : null} >
                        <ListItemText primary="Home" />
                    </ListItem>
                </Link>
                <Link as={`/tasks-board`} href="/tasks-board">
                    <ListItem selected={router.asPath == "/tasks-board" ? true : false} button className={router.asPath == "/tasks-board" ? classes.borderR : null} >
                        <ListItemText primary="Tasks Board" />
                    </ListItem>
                </Link>
            </List>
        </>
    );

    return (
        <>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                {mobileOpen && (
                    <>
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
                                <div className={classes.drawerHeader} />
                                <Divider />
                                {listMenu}
                                <Footer />
                            </Drawer>
                        </Hidden>
                    </>
                )}
                {!mobileOpen && (
                    <>
                        <Hidden xsDown implementation="css">
                            <Drawer
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                                variant="permanent"
                                open
                            >
                                <div className={classes.drawerHeader} />
                                <Divider />
                                {listMenu}
                                <Footer />
                            </Drawer>
                        </Hidden>
                    </>
                )}
            </nav>
        </>
    )

    // return (
    //     <>
    //         <nav className={classes.drawer} aria-label="mailbox folders">
    //             {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
    //             {mobileOpen && (
    //                 <>
    //                     <Hidden smUp implementation="css">
    //                         <Drawer
    //                             container={container}
    //                             variant="temporary"
    //                             anchor={theme.direction === 'rtl' ? 'right' : 'left'}
    //                             open={mobileOpen}
    //                             onClose={handleDrawerToggle}
    //                             classes={{
    //                                 paper: classes.drawerPaper,
    //                             }}
    //                             ModalProps={{
    //                                 keepMounted: true, // Better open performance on mobile.
    //                             }}
    //                         >
    //                             <div className={classes.toolbar} >
    //                                 <Button startIcon={<AddIcon />} style={{ margin: "20px", boxShadow: `0 0 5px ${theme.palette.primary.main}` }} variant="contained" color="primary" onClick={handleDialogOpen}>
    //                                     New List
    //                                 </Button>
    //                                 <Dialog fullWidth={true} maxWidth={'sm'} onClose={handleDialogClose} aria-labelledby="form-dialog-list" open={open}>
    //                                     <DialogTitle id="form-dialog-list" onClose={handleDialogClose}>
    //                                         Create a New List
    //                                     </DialogTitle>
    //                                     <form onSubmit={handleSubmit(onSubmit)} >
    //                                         <DialogContent dividers>
    //                                             <DialogContentText>
    //                                                 Please enter a list name here.
    //                                             </DialogContentText>
    //                                             <TextField
    //                                                 autoFocus
    //                                                 margin="dense"
    //                                                 fullWidth
    //                                                 label="List name"
    //                                                 inputRef={register({ required: "List is required", maxLength: { value: 200, message: "Max lenght is 200 characters" } })}
    //                                                 type="text"
    //                                                 name="listName"
    //                                                 inputProps={{
    //                                                     maxLength: 200,
    //                                                 }}
    //                                             />
    //                                             {errors.listName && <FormHelperText className={classes.helptext}>{errors.listName.message}</FormHelperText>}
    //                                             <FormControlLabel
    //                                                 className={classes.switchMain}
    //                                                 control={
    //                                                     <Switch name="mainList"
    //                                                         color="primary"
    //                                                         inputRef={register()}
    //                                                     />
    //                                                 }
    //                                                 label="Make this list main?"
    //                                             />
    //                                         </DialogContent>
    //                                         <DialogActions>
    //                                             <Button style={{ boxShadow: `0 0 5px ${theme.palette.primary.main}` }} variant="contained" color="primary" type="submit">
    //                                                 Save
    //                                             </Button>
    //                                         </DialogActions>
    //                                     </form>
    //                                 </Dialog>
    //                             </div>
    //                             <Divider />
    //                             <List dense={true}>
    //                                 {data?.data.map(({ _id, listName }) => (
    //                                     <Link key={_id} as={`/list/${_id}`} href="/list/[id]">
    //                                         <ListItem selected={router.asPath == "/list/" + _id ? true : false} button className={router.asPath == "/list/" + _id ? classes.borderR : null} >
    //                                             <ListItemText primary={listName} />
    //                                             <Badge color="secondary" badgeContent={1} className={classes.badge} />
    //                                             <ListItemSecondaryAction>
    //                                                 <IconButton edge="end" aria-label="actions" aria-haspopup="true" onClick={handleClick}>
    //                                                     <MoreVertIcon />
    //                                                 </IconButton>
    //                                                 <Menu
    //                                                     key={_id}
    //                                                     id="simple-menu"
    //                                                     anchorEl={anchorEl}
    //                                                     keepMounted
    //                                                     open={Boolean(anchorEl)}
    //                                                     onClose={handleClose}
    //                                                 >
    //                                                     <MenuItem onClick={() => handleDelete(_id)}>Delete</MenuItem>
    //                                                 </Menu>
    //                                             </ListItemSecondaryAction>
    //                                         </ListItem>
    //                                     </Link>
    //                                 ))}
    //                             </List>
    //                         </Drawer>
    //                     </Hidden>
    //                 </>
    //             )}
    //             {!mobileOpen && (
    //                 <>
    //                     <Hidden xsDown implementation="css">
    //                         <Drawer
    //                             classes={{
    //                                 paper: classes.drawerPaper,
    //                             }}
    //                             variant="permanent"
    //                             open
    //                         >
    //                             <div className={classes.toolbar} >
    //                                 <Button startIcon={<AddIcon />} style={{ margin: "20px", boxShadow: `0 0 5px ${theme.palette.primary.main}` }} variant="contained" color="primary" onClick={handleDialogOpen}>
    //                                     New List
    //                                 </Button>
    //                                 <Dialog fullWidth={true} maxWidth={'sm'} onClose={handleDialogClose} aria-labelledby="form-dialog-list" open={open}>
    //                                     <DialogTitle id="form-dialog-list" onClose={handleDialogClose}>
    //                                         Create a New List
    //                                     </DialogTitle>
    //                                     <form onSubmit={handleSubmit(onSubmit)}>
    //                                         <DialogContent dividers>
    //                                             <DialogContentText>
    //                                                 Please enter a list name here.
    //                                             </DialogContentText>
    //                                             <TextField
    //                                                 autoFocus
    //                                                 margin="dense"
    //                                                 fullWidth
    //                                                 label="List name"
    //                                                 inputRef={register({ required: "List is required", maxLength: { value: 200, message: "Max lenght is 200 characters" } })}
    //                                                 type="text"
    //                                                 name="listName"
    //                                                 inputProps={{
    //                                                     maxLength: 200,
    //                                                 }}
    //                                             />
    //                                             {errors.listName && <FormHelperText className={classes.helptext}>{errors.listName.message}</FormHelperText>}
    //                                             <FormControlLabel
    //                                                 className={classes.switchMain}
    //                                                 control={
    //                                                     <Switch name="mainList"
    //                                                         color="primary"
    //                                                         inputRef={register()}
    //                                                     />
    //                                                 }
    //                                                 label="Make this list main?"
    //                                             />
    //                                         </DialogContent>
    //                                         <DialogActions>
    //                                             <Button style={{ boxShadow: `0 0 5px ${theme.palette.primary.main}` }} variant="contained" color="primary" type="submit">
    //                                                 Save
    //                                             </Button>
    //                                         </DialogActions>
    //                                     </form>
    //                                 </Dialog>
    //                             </div>
    //                             <Divider />
    //                             <List dense={true}>
    //                                 {data?.data.map(({ _id, listName }) => (
    //                                     <Link key={_id} as={`/list/${_id}`} href="/list/[id]">
    //                                         <ListItem selected={router.asPath == "/list/" + _id ? true : false} button className={router.asPath == "/list/" + _id ? classes.borderR : null} >
    //                                             <ListItemText primary={listName} />
    //                                             <Badge color="secondary" badgeContent={1} className={classes.badge} />
    //                                             <ListItemSecondaryAction>
    //                                                 <IconButton edge="end" aria-label="actions" aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
    //                                                     <MoreVertIcon />
    //                                                 </IconButton>
    //                                                 <Menu
    //                                                     key={_id}
    //                                                     elevation={0}
    //                                                     id="simple-menu"
    //                                                     anchorEl={anchorEl}
    //                                                     keepMounted
    //                                                     open={Boolean(anchorEl)}
    //                                                     onClose={handleClose}
    //                                                 >
    //                                                     <MenuItem dense onClose={handleClose}>Turn Main List</MenuItem>
    //                                                     <MenuItem dense onClose={handleClose}>Edit</MenuItem>
    //                                                     <MenuItem dense onClick={() => handleDelete(_id)}>Delete</MenuItem>
    //                                                 </Menu>
    //                                             </ListItemSecondaryAction>
    //                                         </ListItem>
    //                                     </Link>
    //                                 ))}
    //                             </List>
    //                         </Drawer>
    //                     </Hidden>
    //                 </>
    //             )}
    //         </nav>
    //     </>
    // )
}

DrawerLeft.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};
