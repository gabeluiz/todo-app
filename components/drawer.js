import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import ListList from './list-list.js';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import { useRouter } from "next/router";

//Material-ui-components
import {
    Divider,
    Drawer,
    Hidden,
    InputBase,
    IconButton,
    Paper,
    FormHelperText,
    Tooltip,
    FormControlLabel,
    Switch,
    Typography,
    Button,
    Dialog,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';

//Icons
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';

//Constants
import { URL_API_LIST } from '../lib/constants';

//Fetch data
import { mutate as mutateGlobal } from 'swr';
import useFetch from '../hooks/useFetch';

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
}));

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function DrawerLeft(props) {

    const { data, mutate } = useFetch('/api/list');

    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const { window } = props;
    const { register, handleSubmit, watch, errors } = useForm({ mode: "onChange" });
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
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
        mutateGlobal(URL_API_LIST);

        e.target.reset();
    }

    useEffect(() => {
        const uIdToGo = data?.data[0]?._id;
        if(uIdToGo){
            router.push('/list/' + uIdToGo);
        }else{
            return;
        }

    }, [data]);

    const container = window !== undefined ? () => window().document.body : undefined;

    if (!data) return <div>Loading...</div>

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
                                <div className={classes.toolbar} >
                                    <Button startIcon={<AddIcon />} style={{ margin: "20px", boxShadow: `0 0 5px ${theme.palette.primary.main}` }} variant="contained" color="primary" onClick={handleClickOpen}>
                                        New List
                                    </Button>
                                    <Dialog fullWidth={true} maxWidth={'sm'} onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                                        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                                            Create a New List
                                        </DialogTitle>
                                        <DialogContent dividers>
                                            <Paper onSubmit={handleSubmit(onSubmit)} component="form" className={classes.paperInput}>
                                                <InputBase
                                                    autoFocus
                                                    placeholder="Add a List..."
                                                    className={classes.input}
                                                    inputRef={register({ required: "List is required", maxLength: { value: 200, message: "Max lenght is 200 characters" } })}
                                                    type="text"
                                                    name="listName"
                                                    inputProps={{
                                                        maxLength: 200,
                                                    }}
                                                />
                                                <Tooltip title="Make this list master">
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                name="mainList"
                                                                color="primary"
                                                                inputRef={register()}
                                                            />
                                                        }
                                                        label="Main list"
                                                    />
                                                </Tooltip>
                                                <Divider className={classes.divider} orientation="vertical" />
                                                <Tooltip title="Add">
                                                    <IconButton color="inherit" type="submit" className={classes.iconButton} aria-label="add">
                                                        <AddIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </Paper>
                                            {errors.listName && <FormHelperText className={classes.helptext}>{errors.listName.message}</FormHelperText>}
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                <Divider />
                                <ListList data={data} />
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
                                <div className={classes.toolbar} >
                                    <Button startIcon={<AddIcon />} style={{ margin: "20px", boxShadow: `0 0 5px ${theme.palette.primary.main}` }} variant="contained" color="primary" onClick={handleClickOpen}>
                                        New List
                                    </Button>
                                    <Dialog fullWidth={true} maxWidth={'sm'} onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                                        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                                            Create a New List
                                        </DialogTitle>
                                        <DialogContent dividers>
                                            <Paper onSubmit={handleSubmit(onSubmit)} component="form" className={classes.paperInput}>
                                                <InputBase
                                                    autoFocus
                                                    placeholder="Add a List..."
                                                    className={classes.input}
                                                    inputRef={register({ required: "List is required", maxLength: { value: 200, message: "Max lenght is 200 characters" } })}
                                                    type="text"
                                                    name="listName"
                                                    inputProps={{
                                                        maxLength: 200,
                                                    }}
                                                />
                                                <Tooltip title="Make this list master">
                                                    <FormControlLabel
                                                        control={
                                                            <Switch name="mainList"
                                                                color="primary"
                                                                inputRef={register()}
                                                            />
                                                        }
                                                        label="Main list"
                                                    />
                                                </Tooltip>
                                                <Divider className={classes.divider} orientation="vertical" />
                                                <Tooltip title="Add">
                                                    <IconButton color="inherit" type="submit" className={classes.iconButton} aria-label="add">
                                                        <AddIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </Paper>
                                            {errors.listName && <FormHelperText className={classes.helptext}>{errors.listName.message}</FormHelperText>}
                                        </DialogContent>
                                    </Dialog>
                                </div>
                                <Divider />
                                <ListList data={data} />
                            </Drawer>
                        </Hidden>
                    </>
                )}
            </nav>
        </>
    )
}

DrawerLeft.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};
