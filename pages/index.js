import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/client';
import AppBar from '../components/appBar.js';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  List,
  Card,
  CardContent,
  Grid,
  Tooltip,
} from '@material-ui/core';
import Copyright from '../components/copyright';
import toast,
{ Toaster } from 'react-hot-toast';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import useFetch from '../hooks/useFetch';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import DoneIcon from '@material-ui/icons/Done';
import { URL_API_ITEM } from '../lib/constants';
import Container from '../components/container';
import Toolbar from '../components/toolbar';
import InputItem from '../components/input-item.js';
import Layout from '../components/layout.js';

const useStyles = makeStyles((theme) => ({
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
  iconButton: {
    padding: 10,
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

  const { data, mutate } = useFetch('/api/list');
  const [session, loading] = useSession();
  const classes = useStyles();
  const [checked, setChecked] = useState([]);
  const [characters, updateCharacters] = useState(data);


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


    const res = fetch(URL_API_ITEM, {
      method: "POST",
      body: JSON.stringify(dados)
    })
    setTimeout(function () {
      mutate(data)
    }.bind(this), 100)

  };

  //# DELETAR TASK
  const handleDelete = (_id) => () => {
    const res = fetch(URL_API_ITEM, {
      method: "DELETE",
      body: JSON.stringify(_id)
    })
    messagePromise(res);
    setTimeout(function () {
      mutate(data)
    }.bind(this), 100)
  }


  // //LOADING COM PRÉ DATA CASO NÃO CARREGUE OS DADOS DA API
  // if (!data) {
  //   return <Box display="flex" pt={12} justifyContent="center">
  //     <Typography align="left" color="inherit" variant="h3" component="h1" gutterBottom>
  //       Loading...
  //     </Typography>
  //   </Box>
  // } else if (!data.success) {
  //   return <Box display="flex" pt={12} justifyContent="center">
  //     <Typography align="left" color="inherit" variant="h3" component="h1" gutterBottom>
  //       Something went wrong, try again later...
  //     </Typography>
  //   </Box>
  // }

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

    const res = fetch(URL_API_ITEM, {
      method: "POST",
      body: JSON.stringify(dados)
    })

  }


  return (
    <Layout>
      <AppBar />
      <Container>
        <Toolbar/>
        {!session && <>
          <Typography align="left" color="inherit" variant="h3" component="h1" gutterBottom>
            Simple like that. <br />
              Just to do it. <br />
              Do your day.
          </Typography>
        </>}
        {session && <>
          <InputItem />
          {(() => {
            if (data?.data.length === 0) {

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
                    <Typography align="left" variant="h6" component="h6">You don't have any item yet...</Typography>
                  </Grid>
                </Grid>
              )

            } else {
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
                                  {data?.data.map(({ _id, task, complete }, index) => {
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

                        {/* {(() => {
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
                        })()} */}
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              )
            }
          })()}
        </>}
        <Copyright />
        <Toaster />
      </Container>
    </Layout>
  )
}

export default Home;