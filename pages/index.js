import React, { useEffect } from 'react';
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
  Grid,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import Copyright from '../components/Copyright';
import { useForm } from 'react-hook-form';
import toast,
{ Toaster } from 'react-hot-toast';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';
import useFetch from '../hooks/useFetch';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import DoneIcon from '@material-ui/icons/Done';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

//links da api de produção e desenvolvimento
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
    border: 'none',
  },
  divDragging: {
    backgroundColor: `${props => (props.isDragging ? 'lightgreen' : 'white')}`,
  },
  checkbox: {
    color: theme.palette.primary.light,
    '&$checked': {
      color: theme.palette.secondary.main,
    },
  }
}));

function Home() {

  const { data, mutate } = useFetch('/api/todo');
  const [session, loading] = useSession();
  const classes = useStyles();
  const { register, handleSubmit, watch, errors } = useForm({ mode: "onChange" });
  const [checked, setChecked] = React.useState([]);
  const [characters, updateCharacters] = React.useState(data);

  //# NOTIFICAÇÃO
  function messagePromise(fetch) {
    toast.promise(fetch, {
      loading: 'Saving...',
      success: 'Saved!',
      error: 'Could not save.',

    },
      {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        }
      }
    )
  }

  //# INCLUIR TASK
  const onSubmit = async (dados, e) => {
    const res = fetch(urlDev, {
      method: "POST",
      body: JSON.stringify(dados)
    })
    messagePromise(res);
    e.target.reset();
    setTimeout(function () {
      mutate(data)
    }.bind(this), 100)
  }

  //# CHECKAR TASK
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    const dados = { _id: value, complete: true };
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      dados.complete = false;
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);


    const res = fetch(urlDev, {
      method: "POST",
      body: JSON.stringify(dados)
    })
    setTimeout(function () {
      mutate(data)
    }.bind(this), 100)

  };

  //# DELETAR TASK
  const handleDelete = (_id) => () => {
    const res = fetch(urlDev, {
      method: "DELETE",
      body: JSON.stringify(_id)
    })
    messagePromise(res);
    setTimeout(function () {
      mutate(data)
    }.bind(this), 100)
  }

  //LOADING COM PRÉ DATA CASO NÃO CARREGUE OS DADOS DA API
  if (!data) {
    return <Box display="flex" pt={12} justifyContent="center">
      <Typography align="left" color="inherit" variant="h3" component="h1" gutterBottom>
        Loading.... <br />
      </Typography>
    </Box>
  } else if (!data.success) {
    return <Box display="flex" pt={12} justifyContent="center">
      <Typography align="left" color="inherit" variant="h3" component="h1" gutterBottom>
        Something went wrong, try again later...<br />
      </Typography>
    </Box>
  }

  //grava um array com todos os completos
  const completed = data.data.filter(item => item.complete === true)

  function handleOnDragEnd(result) {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    //data from array de tasks
    const items = Array.from(data.data);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);

    updateCharacters({ data: items });

    const dados = { _id: draggableId, order: destination.index + 1 }

    const res = fetch(urlDev, {
      method: "POST",
      body: JSON.stringify(dados)
    })

  }

  // USAR ARRAY CHARACTERS ATUALIZADO COM O ARRAY DATA VINDO DA API
  if (!characters) {
    updateCharacters(data);
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
          <Grid
            container
            spacing={3}
            direction="row"
            justify="center"
            alignItems="center">
            <Grid item xs={12} sm={6}>
              <Paper onSubmit={handleSubmit(onSubmit)} component="form" className={classes.paperInput}>
                <InputBase
                  placeholder="Add a task..."
                  className={classes.input}
                  inputRef={register({ required: "Task is required", maxLength: { value: 200, message: "Max lenght is 200 characters" } })}
                  type="text"
                  name="task"
                  inputProps={{
                    maxLength: 200,
                  }}
                />
                <Tooltip title="Add">
                  <IconButton color="inherit" type="submit" className={classes.iconButton} aria-label="add">
                    <AddIcon />
                  </IconButton>
                </Tooltip>
              </Paper>
              {errors.task && <FormHelperText className={classes.helptext}>{errors.task.message}</FormHelperText>}
            </Grid>
          </Grid>

          {(() => {
            if (data.data.length !== 0) {
              return (
                <Grid
                  container
                  spacing={3}
                  direction="row"
                  justify="center"
                  alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <Card className={classes.card}>
                      <CardContent>
                        <DragDropContext onDragEnd={handleOnDragEnd}>
                          <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                              <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                              >
                                <List className={classes.list}>
                                  {data.data.map(({ _id, task, complete }, index) => {
                                    if (!complete)
                                      return (
                                        <Draggable key={_id} draggableId={_id} index={index}>
                                          {(provided, snapshot) => (
                                            <div
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                            >
                                              <ListItem key={_id} role={undefined} dense button onClick={handleToggle(_id)}>
                                                <ListItemIcon>
                                                  <Checkbox
                                                    className={classes.checkbox}
                                                    edge="start"
                                                    checked={checked.indexOf(_id) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    checkedIcon={<DoneIcon />}
                                                    icon={<RadioButtonUncheckedIcon />}
                                                  />
                                                </ListItemIcon>
                                                <ListItemText style={{ textDecoration: checked.indexOf(_id) !== -1 ? "line-through" : "" }} primary={task} />
                                                <ListItemSecondaryAction>
                                                  <Tooltip title="Delete">
                                                    <IconButton onClick={handleDelete(_id)} color="inherit" size="small" edge="end" aria-label="delete">
                                                      <DeleteOutlineIcon size="small" />
                                                    </IconButton>
                                                  </Tooltip>
                                                </ListItemSecondaryAction>
                                              </ListItem>
                                            </div>
                                          )}
                                        </Draggable>
                                      )
                                  })}
                                  {provided.placeholder}
                                </List>
                              </div>
                            )}
                          </Droppable>
                        </DragDropContext>

                        {(() => {
                          if (completed.length !== 0) {
                            return (
                              <Accordion className={classes.accordion}>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls="panel1a-content"
                                  id="panel1a-header"
                                >
                                  <Typography variant="caption" >Completed ({completed.length}) </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <List className={classes.list}>
                                    {data.data.map(({ _id, task, complete, order }, index) => {
                                      if (complete)
                                        return (
                                          <ListItem key={_id} role={undefined} dense button onClick={handleToggle(_id)}>
                                            <ListItemIcon>
                                              <Checkbox
                                                className={classes.checkbox}
                                                edge="start"
                                                checked={complete}
                                                disableRipple
                                                checkedIcon={<DoneIcon />}
                                                icon={<RadioButtonUncheckedIcon />}
                                              />
                                            </ListItemIcon>
                                            <ListItemText style={{ textDecoration: complete ? "line-through" : "" }} primary={task} />
                                            <ListItemSecondaryAction>
                                              <Tooltip title="Delete">
                                                <IconButton onClick={handleDelete(_id)} color="inherit" size="small" edge="end" aria-label="delete">
                                                  <DeleteOutlineIcon size="small" />
                                                </IconButton>
                                              </Tooltip>
                                            </ListItemSecondaryAction>
                                          </ListItem>
                                        )
                                    })}
                                  </List>
                                </AccordionDetails>
                              </Accordion>
                            )
                          }
                        })()}
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              )
            } else {
              return (

                <Grid
                  container
                  spacing={0}
                  direction="column"
                  justify="center"
                  alignItems="center"
                  style={{ minHeight: '50vh' }}
                >
                  <Grid item xs={12} sm={6}>
                    <Typography align="left" variant="h6" component="h6">You don't have any task yet...</Typography>
                  </Grid>
                </Grid>
              )
            }
          })()}
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