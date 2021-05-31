import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    makeStyles
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Link from 'next/link';
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
    borderR: {
        borderRight: `3px solid ${theme.palette.primary.main}`,
    },
}));

export default function ListList({ data }) {

    const classes = useStyles();
    const router = useRouter();

    const list = (
        <List dense={true}>
            {data.data.map(({ _id, listName }) => (
                <Link key={_id} as={`/list/${_id}`} href="/list/[id]">
                    <ListItem selected={router.asPath == "/list/" + _id ? true : false} button className={router.asPath == "/list/" + _id ? classes.borderR : null} >
                        <ListItemText primary={listName} secondary="0 Item" />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="actions">
                                <MoreVertIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </Link>
            ))}
        </List>
    )

    return (
        <div>
            {list}
        </div>
    )
}