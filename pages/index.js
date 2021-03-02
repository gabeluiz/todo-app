import React, {
  useState,
  useEffect
} from 'react';
import { useSession } from 'next-auth/client';
import AppBar from '../components/topBar/appBar.js';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '../components/navBar/drawer.js';
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
  Paper
} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Copyright from '../components/Copyright';
import { useForm } from 'react-hook-form';
import toast,
{ Toaster } from 'react-hot-toast';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
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
    maxWidth: 560,
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
    width: 560,
    backgroundColor: theme.palette.background.default
  }
}));

function Home(props) {

  const [session, loading] = useSession();
  const classes = useStyles();
  const { register, handleSubmit, watch, errors } = useForm({ mode: "onChange" });
  const [checked, setChecked] = useState([0]);

  const onSubmit = async (data, e) => {
    const res = fetch('http://localhost:3000/api/todo', {
      method: "post",
      body: JSON.stringify(data)
    })

    toast.promise(res, {
      loading: 'Loading',
      success: 'Task Added',
      error: 'Error when fetching',
    })
    e.target.reset();
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

    const res = fetch('https://todos-swart.vercel.app/api/todo', {
      method: "delete",
      body: JSON.stringify(_id)
    })

    toast.promise(res, {
      loading: 'Loading',
      success: 'Delete',
      error: 'Error when fetching',
    })

  }

  return (
    <Container>
      <AppBar />
      {/* para usar drawer lateral, ideal box display flex, para ficar side by side com o drawer */}
      <Box display="flex" justifyContent="center">
        {/* <Drawer /> */}
        {/* nesse box abaixo usar o my and pt de cima para ficar justificado */}
        <Box pt={12} >
          {!session && <>
            <Typography align="center" color="text" variant="h3" component="h1" gutterBottom>
              To-do list, do and gain productivity and organization <br />
              Please login to see your todos
            </Typography>
          </>}
          {session && <>
            <Box>
              <Paper onSubmit={handleSubmit(onSubmit)} component="form" className={classes.paper}>
                <InputBase
                  placeholder="Todo..."
                  className={classes.input}
                  inputRef={register}
                  type="text"
                  name="task"
                />
                <IconButton color="inherit" type="submit" className={classes.iconButton} aria-label="add">
                  <AddIcon />
                </IconButton>
              </Paper>
              <p> Tasks: </p>
              <>
                <List className={classes.list}>
                  {props.regsTodo.data.map((regTodo) => {
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
              </>
            </Box>
          </>}
          <footer className={classes.footer}>
            <Copyright />
          </footer>
        </Box>
      </Box>
      <Toaster />
    </Container>

  )
}

//pegar dados do nosso banco de dados... por padrão GET
export async function getStaticProps() {
  const res = await fetch('https://todos-swart.vercel.app/api/todo')
  const regsTodo = await res.json()

  return {
    props: {
      regsTodo,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  }
}

export default Home