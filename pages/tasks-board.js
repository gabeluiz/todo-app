
import React, { useState } from 'react';
import Layout from '../components/layout';
import Toolbar from '../components/toolbar';
import ListTaskBoard from '../components/list-task-board';
import { Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import DialogMoreList from './../components/dialog-more-list';
import useFetch from '../hooks/useFetch';
import toast, { Toaster } from 'react-hot-toast';
import {
    URL_API_ITEM,
    URL_API_LIST
}
    from '../lib/constants';

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        boxShadow: `0 0 5px ${theme.palette.secondary.main}`,
        zIndex: theme.z,
    }
}));

export default function TasksBoard() {

    const classes = useStyles();

    //States
    const [open, setOpen] = useState(false);

    //Data
    const { data, error, mutate } = useFetch(URL_API_LIST);

    if (error) return <div>Failed to load list</div>
    if (!data) return <div>Loading...</div>

    //Add list
    const onSubmit = async (dados, e) => {

        const res = await fetch(URL_API_LIST, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dados)
        })

        handleDialogToggle();

        if (res.ok) {
            mutate();
            toast.success("Successfully created!");
        }else{
            toast.error("This didn't work.");
        }

        e.target.reset();
    }

    //# DELETAR TASK
    const handleDelete = async (_id) => {
        const res = await fetch(URL_API_LIST + "/" + _id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })

        console.log(res)

        if (res.ok) {
            mutate();
            toast.success("Successfully deleted!");
        }else{
            toast.error("This didn't work.");
        }
    }

    //Open/Close Dialog
    const handleDialogToggle = () => {
        setOpen(!open);
    };

    return (
        <Layout>
            <Toaster />
            <Toolbar />
            <ListTaskBoard data={data?.data} handleDelete={handleDelete} />
            <Fab onClick={handleDialogToggle} aria-label="Add" className={classes.fab} color="secondary">
                <AddIcon />
            </Fab>
            <DialogMoreList open={open} handleDialogToggle={() => setOpen(!open)} onSubmit={onSubmit} />
        </Layout>
    )
}