import React, { useState } from 'react';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';


import {
    FormHelperText,
    Button,
    Dialog,
    TextField,
    DialogContentText,
    Typography,
    IconButton,
}
    from "@material-ui/core";

import { useForm } from 'react-hook-form';

//Icons
import CloseIcon from '@material-ui/icons/Close';

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
    helptext: {
        color: theme.palette.error.light,
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


export default function DialogMoreList(props) {

    //Style
    const classes = useStyles();
    const theme = useTheme();

    const { register, handleSubmit, watch, errors } = useForm({ mode: "onChange" });

    const { open, handleDialogToggle, onSubmit } = props;

    return (
        <Dialog fullWidth={true} maxWidth={'sm'} onClose={handleDialogToggle} aria-labelledby="form-dialog-list" open={open}>
            <DialogTitle id="form-dialog-list" onClose={handleDialogToggle}>
                Create a new task board
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)} >
                <DialogContent dividers>
                    <DialogContentText>
                        Please enter a board name here.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        fullWidth
                        label="Board name"
                        inputRef={register({ required: "Board name is required", maxLength: { value: 200, message: "Max lenght is 200 characters" } })}
                        type="text"
                        name="listName"
                        inputProps={{
                            maxLength: 200,
                        }}
                    />
                    {errors.listName && <FormHelperText className={classes.helptext}>{errors.listName.message}</FormHelperText>}
                </DialogContent>
                <DialogActions>
                    <Button style={{ boxShadow: `0 0 5px ${theme.palette.primary.main}` }} variant="contained" color="primary" type="submit">
                        Save
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )

}