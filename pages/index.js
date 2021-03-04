import React from 'react';
import PropTypes from 'prop-types';
import { useSession } from 'next-auth/client';
import AppBar from '../components/topBar/appBar.js';
import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  InputBase,
  Typography,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  List,
  Paper,
  FormHelperText,
  Card,
  CardContent,
} from '@material-ui/core';
import Copyright from '../components/Copyright';
import { useForm } from 'react-hook-form';
import toast,
{ Toaster } from 'react-hot-toast';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddIcon from '@material-ui/icons/Add';
import useFetch from '../hooks/useFetch';

const urlProd = "https://todos-swart.vercel.app/api/todo";
const urlDev = 'http://localhost:3000/api/todo';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 0,
  },
  list: {
    width: '100%',
    maxWidth: '100%',
    maxHeight: 400,
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '0.4em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px #212121',
      webkitBoxShadow: 'inset 0 0 6px #212121'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#616161',
    }
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  paper: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    backgroundColor: theme.palette.background.default,
  },
  helptext: {
    color: theme.palette.error.light,
  },
  content: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  card: {
    backgroundColor:theme.palette.background.default,
    boxShadow: '6px 6px 8px 0 rgba(0, 0, 0, 0.25) inset, -4px -4px 6px 0 rgba(255, 255, 255, 0.3) inset',
  }
}));

function Home() {

  const [session, loading] = useSession();
  const classes = useStyles();
  const { register, handleSubmit, watch, errors } = useForm({ mode: "onChange" });
  const [checked, setChecked] = React.useState([0]);

  const onSubmit = async (dados, e) => {
    const res = fetch(urlProd, {
      method: "post",
      body: JSON.stringify(dados)
    })
    toast.promise(res, {
      loading: 'Loading',
      success: 'Task Added',
      error: 'Error when fetching',
    })
    e.target.reset();
    setTimeout(function () {
      mutate(data)
    }.bind(this), 100)
  }

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleDelete = (_id) => () => {

    const res = fetch(urlProd, {
      method: "delete",
      body: JSON.stringify(_id)
    })
    toast.promise(res, {
      loading: 'Loading',
      success: 'Delete',
      error: 'Error when fetching',
    })
    setTimeout(function () {
      mutate(data)
    }.bind(this), 100)
  }

  const { data, mutate } = useFetch('/api/todo')

  if (!data) {
    return <Box display="flex" pt={12} justifyContent="center">
      <Typography align="left" color="inherit" variant="h3" component="h1" gutterBottom>
        Loading.... <br />
      </Typography>
    </Box>
  }

  return (
    <div className={classes.root}>
      <AppBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {!session && <>
          <Typography align="left" color="inherit" variant="h3" component="h1" gutterBottom>
            Simple like that. <br />
              Just to do it. <br />
              Do your day.
          </Typography>
        </>}
        {session && <>
          <Card className={classes.card}>
            <CardContent>
            <Paper onSubmit={handleSubmit(onSubmit)} component="form" className={classes.paper}>
              <InputBase
                placeholder="Task..."
                className={classes.input}
                inputRef={register({ required: "Task is required", maxLength: { value: 200, message: "Max lenght is 200 characters" } })}
                type="text"
                name="task"
                inputProps={{
                  maxLength: 200,
                }}
              />
              <IconButton color="inherit" type="submit" className={classes.iconButton} aria-label="add">
                <AddIcon />
              </IconButton>
            </Paper>
            {errors.task && <FormHelperText className={classes.helptext}>{errors.task.message}</FormHelperText>}
            <List className={classes.list}>
              {data.data.map((regTodo) => {
                const labelId = `checkbox-list-label-${regTodo._id}`;
                return (
                  <ListItem divider key={regTodo._id} role={undefined} dense button onClick={handleToggle(regTodo._id)}>
                    <ListItemIcon color="inherit">
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(regTodo._id) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText style={{ textDecoration: checked.indexOf(regTodo._id) !== -1 ? "line-through" : "" }} id={labelId} primary={regTodo.task} />
                    <ListItemSecondaryAction>
                      <IconButton onClick={handleDelete(regTodo._id)} color="inherit" size="small" edge="end" aria-label="delete">
                        <DeleteForeverIcon size="small" />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                )
              })
              }
            </List>
            </CardContent>
          </Card>
        </>}
        <footer className={classes.footer}>
          <Copyright />
        </footer>
        <Toaster />
      </main>
    </div>

  )
}

export default Home