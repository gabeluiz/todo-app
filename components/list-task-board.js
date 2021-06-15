import React from 'react';
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
}
    from "@material-ui/core";
import {
    makeStyles
}
    from '@material-ui/core/styles';
//icons
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

//data
import useFetch from '../hooks/useFetch';
import { URL_API_ITEM } from '../lib/constants';

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
}));


export default function ListTaskBoard(props) {

    //Style
    const classes = useStyles();

    const { data, handleDelete } = props;

    return (
        <div className={classes.root}>
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
                                            <CardHeader
                                                disableTypography
                                                action={
                                                    <>
                                                        <IconButton aria-label="edit" color="inherit" size="small">
                                                            <EditIcon fontSize="inherit" />
                                                        </IconButton>
                                                        <IconButton aria-label="delete" onClick={() => handleDelete(_id)} color="inherit" className={classes.margin} size="small">
                                                            <DeleteIcon fontSize="inherit" />
                                                        </IconButton>
                                                    </>
                                                }
                                                title={listName}
                                            />
                                            <Divider />
                                            <CardContent>
                                                {/* aqui lsita das tasks */}
                                                {_id}
                                            </CardContent>
                                            <Divider />
                                            <CardActions className={classes.actions}>
                                                <Badge color="primary" badgeContent={1} className={classes.margin} />
                                                <IconButton color="inherit" aria-label="add">
                                                    <AddIcon fontSize="small" />
                                                </IconButton>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </>
                        )
                    }
                })()}
            </Grid>
        </div>

    )
}