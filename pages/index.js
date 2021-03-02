import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import AppBar from '../components/topBar/appBar.js';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '../components/navBar/drawer.js';
import { Box, Button, TextField, Typography, ButtonGroup } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Link from '../components/Link';
import Copyright from '../components/Copyright';
import { useForm } from 'react-hook-form';
import toast , { Toaster } from 'react-hot-toast';

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
    width: 20,
  },
  buttonGroup: {
    boxShadow: '0 0 1em rgb(0 0 0 / 20%)',
    width: 670,
  },
}));

const Home = (props) => {

  const [input, setInput] = useState({ todoInput: '' });
  const [todos, setTodos] = useState([]);
  const [session, loading] = useSession();
  const classes = useStyles();
  const { register, handleSubmit, watch, errors } = useForm({ mode: "onChange" });

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

  const onSubmit = async (data, e) => {
    console.log(data)
    const res = await fetch("http://localhost:3000/api/todo", {
      method: "post",
      body: JSON.stringify(data)
    })
    if (res.ok) {
      toast.success('task added.');
    }
    else {
      toast.error('Please try later.');
    }
    console.log(e);
    e.target.reset();
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <ButtonGroup fullWidth={true} className={classes.buttonGroup} size="small" aria-label="small outlined button group">
                  <input ref={register}
                    type="text"
                    name="task"
                  />
                  <Button
                    className={classes.button}
                    type="submit"
                  >
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
                {props.regsTodo.map((regTodo) => {
                  return (
                    <div>{regTodo.task}</div>
                  )
                })
                }
              </>
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
      <Toaster />
    </Container>

  )
}

export default Home

export async function getStaticProps() {
  const regsTodo = await fetch('http://localhost:3000/api/todo').then(res => res.json())

  return {
    props: {
      regsTodo,
    }
  }
}