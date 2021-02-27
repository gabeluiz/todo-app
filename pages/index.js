import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import AppBar from '../components/topBar/appBar.js';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '../components/navBar/drawer.js';
import { Box, Button, TextField, Typography, ButtonGroup } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Link from '../components/Link';
import Copyright from '../components/Copyright';

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
    height: 50,
    marginBottom: 0,
  },
  button: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
  },
  buttonGroup: {
    boxShadow: '0 0 1em rgb(0 0 0 / 20%)',
    width: 600,
  },
}));

export default function Home() {

  const [input, setInput] = useState({ todoInput: '' });
  const [todos, setTodos] = useState([]);
  const [session, loading] = useSession();
  const classes = useStyles();

  function handleChangeInputTodo(e) {
    console.log(e);
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  function handleAddTodo(event) {
    event.preventDefault();
    setTodos([...todos, { id: Math.random(), title: input.todoInput }]);
    setInput({ todoInput: '' });
  }
  function handleRemoveTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  function handleCompleteTodo(id) {
    const newTodos = todos.map(todo => {
      return todo.id === id ? { ...todo, complete: !todo.complete } : todo;
    });
    setTodos(newTodos);
  }

  useEffect(() => {
    const filtered = todos.filter(todo => todo.complete);
    if (filtered.length <= 1)
      document.title = `${filtered.length} tarefa completa.`
    else
      document.title = `${filtered.length} tarefas completas.`
  }, [todos]);

  return (
    <Container maxWidth="md">
      <AppBar />
      {/* para usar drawer lateral, ideal box display flex, para ficar side by side com o drawer */}
      <Box display="flex">
        {/* <Drawer /> */}
        {/* nesse box abaixo usar o my and pt de cima para ficar justificado */}
        <Box pt={12}>
          {!session && <>
            <Typography color='primary' variant="h3" component="h1" gutterBottom>
              To-do list, do and gain productivity and organization <br />
              Please login to see your todos
            </Typography>
          </>}
          {session && <>
            <Box>
              <form>
                <ButtonGroup className={classes.buttonGroup} size="small" aria-label="small outlined button group">
                  <TextField
                    variant="outlined"
                    size="small"
                    color="tertiary"
                    value={input.todoInput}
                    name={'todoInput'}
                    label="Criar uma lista..."
                    onChange={(event) => handleChangeInputTodo(event)}
                  />
                  <Button
                    className={classes.button}
                    onClick={(event) => handleAddTodo(event)}>
                    +
                </Button>
                </ButtonGroup>
              </form>
              <p> itens concluídos: </p>
              <>
                {todos.map((todo) => {
                  return (
                    <ul>
                      <li key={todo.id}>
                        <label style={{ textDecoration: todo.complete === true ? "line-through" : "" }} ><input type="checkbox" onChange={() => handleCompleteTodo(todo.id)} /> {todo.title}</label>
                        <span onClick={() => handleRemoveTodo(todo.id)}>X</span>
                      </li>
                    </ul>
                  )
                })
                }
              </>
              <p> Your Complete Tasks: </p>
              <>
                {todos.map((todo) => {
                  if (todo.complete)
                    return (
                      <ul>
                        <li key={todo.id}>
                          <label> {todo.title}</label>
                          <span onClick={() => handleRemoveTodo(todo.id)}>X</span>
                        </li>
                      </ul>
                    )
                })
                }
              </>
            </Box>
          </>}
          <footer className={classes.footer}>
            <Copyright />
          </footer>
        </Box>
      </Box>
    </Container>

  )
}