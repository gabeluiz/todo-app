import React from 'react';
import { List, ListSubheader, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Link from 'next/link';
import { useRouter } from "next/router";

export default function ListList({ data }) {

    const router = useRouter();

    return (
        <div>
            <List subheader={<ListSubheader>Lists</ListSubheader>} >
                {data.data.map(({ _id, list }) => (
                    <Link key={_id} as={`/list/${_id}`} href="/list/[id]">
                        <ListItem selected={router.asPath == "/list/" + _id ? true : false} button component="a" >
                            <ListItemText variant="inherit" primary={list} secondary="0 Item" />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="actions">
                                    <MoreVertIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </div>
    )
}