import React, { useState } from 'react';
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    IconButton,
    Typography,
    Badge,
    TextField,
    FormHelperText,
    Button,
} from "@material-ui/core";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import ListTask from './list-task';
import toast, { Toaster } from 'react-hot-toast';

//icons
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

//data
import useFetch from '../hooks/useFetch';
import { URL_API_ITEM, URL_API_LIST } from '../lib/constants';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: 10,
    },
    subtitle: {
        color: "rgba(203, 204, 210, 0.5)"
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    actions: {
        display: "flex",
        justifyContent: "flex-end"
    },
    margin: {
        margin: theme.spacing(1),
    },
    inputTask: {
        margin: 6,
    },
}));


export default function ListTaskBoard(props) {

    const classes = useStyles();
    const theme = useTheme();
    const { data, handleDelete, handleEdit, currentEdit, setCurrentEdit } = props;
    const { register, handleSubmit, watch, errors } = useForm({ mode: "onChange" });
    const [currentNew, setCurrentNew] = useState('');

    const { register: register2, errors: errors2, handleSubmit: handleSubmit2 } = useForm({ mode: "onChange" });

    const { data: itemList, error, mutate } = useFetch(URL_API_ITEM);
    console.log(itemList);

    const handleEditTitle = (e, _id) => {

        if (currentEdit == _id) {
            setCurrentEdit('');
            return;
        }
        setCurrentEdit(_id);
        e.preventDefault();
    }

    const handleNew = (e, _id) => {
        if (currentNew == _id) {
            setCurrentNew('');
            return;
        }
        setCurrentNew(_id);
        e.preventDefault();
    }

    const hadleSubmitItem = async (dados, e) => {
        console.log(dados)
        const res = await fetch(URL_API_ITEM, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dados)
        })

        if (res.ok) {
            mutate();
            setCurrentNew('');
            toast.success("Successfully created!");
        } else {
            toast.error("This didn't work.");
        }
        e.target.reset();
    }

    return (
        <div className={classes.root}>
            <Toaster />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h5">
                        Tasks Board
                    </Typography>
                    <Typography variant="subtitle2" className={classes.subtitle}>
                        This is your Tasks Board
                    </Typography>
                </Grid>
                {(() => {
                    if (data.length === 0) {
                        return (
                            <Grid
                                container
                                spacing={0}
                                direction="column"
                                justify="center"
                                alignItems="center"
                                style={{ minHeight: '50vh' }}
                            >
                                <Grid item xs={12} sm={8}>
                                    <Typography align="left" variant="h6" component="h6">You don't have any item for this list yet...</Typography>
                                </Grid>
                            </Grid>
                        )
                    } else {
                        return (
                            <>
                                {data.map(({ _id, listName }) => (
                                    <Grid item xs={12} sm={6} key={_id}>

                                        <Card className={classes.root}>
                                            <form onSubmit={handleSubmit(handleEdit)} >
                                                <CardHeader
                                                    disableTypography
                                                    action={
                                                        <>
                                                            {(currentEdit == _id ?
                                                                <IconButton aria-label="edit" color="inherit" size="small" type="submit" >
                                                                    <AddIcon fontSize="inherit" />
                                                                </IconButton>
                                                                :
                                                                <IconButton aria-label="edit" color="inherit" size="small" type="button" onClick={(e) => handleEditTitle(e, _id)}>
                                                                    <EditIcon fontSize="inherit" />
                                                                </IconButton>
                                                            )}

                                                            <IconButton aria-label="delete" onClick={() => handleDelete(_id)} color="inherit" className={classes.margin} size="small">
                                                                <DeleteIcon fontSize="inherit" />
                                                            </IconButton>
                                                        </>
                                                    }
                                                    title={(currentEdit == _id ?
                                                        <TextField
                                                            autoFocus
                                                            defaultValue={listName}
                                                            fullWidth
                                                            type="text"
                                                            name="listName"
                                                            inputProps={{
                                                                maxLength: 200,
                                                            }}
                                                            inputRef={register({ required: "Board name is required", maxLength: { value: 200, message: "Max lenght is 200 characters" } })}
                                                        /> : listName)}
                                                />
                                                {errors.listName && <FormHelperText className={classes.helptext}>{errors.listName.message}</FormHelperText>}
                                                <TextField
                                                    style={{ display: 'none' }}
                                                    name="_id"
                                                    type="text"
                                                    value={currentEdit}
                                                    inputRef={register({ required: "list is required" })}
                                                />
                                            </form>
                                            <Divider />
                                            <CardContent>
                                                <ListTask listId={_id} itemList={itemList} />
                                            </CardContent>
                                            <Divider />
                                            <form onSubmit={handleSubmit2(hadleSubmitItem)} >
                                                <CardActions className={classes.actions}>
                                                    <>
                                                        {(currentNew == _id ?
                                                            <TextField
                                                                fullWidth
                                                                type="text"
                                                                name="itemName"
                                                                inputProps={{
                                                                    maxLength: 200,
                                                                }}
                                                                className={classes.inputTask}
                                                                inputRef={register2({ required: "Item name is required", maxLength: { value: 200, message: "Max lenght is 200 characters" } })}
                                                            />
                                                            :
                                                            ''
                                                        )}

                                                        <TextField
                                                            style={{ display: 'none' }}
                                                            name="listId"
                                                            type="text"
                                                            value={currentNew}
                                                            inputRef={register2({ required: "list is required" })}
                                                        />
                                                    </>
                                                    <>
                                                        {(currentNew == _id ?
                                                            <Button size="small" style={{ boxShadow: `0 0 5px ${theme.palette.primary.main}` }} variant="contained" color="primary" type="submit">
                                                                Save
                                                            </Button>
                                                            :
                                                            <IconButton size="medium" aria-label="edit" color="inherit" type="button" onClick={(e) => handleNew(e, _id)}>
                                                                <AddIcon fontSize="small" />
                                                            </IconButton>
                                                        )}
                                                    </>

                                                </CardActions>
                                            </form>
                                        </Card>

                                    </Grid>
                                ))}
                            </>
                        )
                    }
                })()}
            </Grid>
        </div >

    )
}