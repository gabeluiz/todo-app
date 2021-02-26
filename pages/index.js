import styles from '../styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';
import MenuAppBar from '../components/menu/menuappbar.js';
import Avatar from '../components/menu/avatar.js';

export default function Home() {

  const [input, setInput] = useState({ todoInput: '' });
  const [todos, setTodos] = useState([]);
  const [session, loading] = useSession();

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
    <div>
      <MenuAppBar></MenuAppBar>
      <main className={styles.main}>
        {!session && <>
          <h1 className={styles.title}>
            TO DO LIST <br />
            please login to see ur todos
        </h1>
        </>}
        {session && <>
          <h1 className={styles.title}>
            TO DO LIST
        </h1>
          <div className={styles.card}>
            <form><input value={input.todoInput} name={'todoInput'} className={styles.inputAdd} onChange={(event) => handleChangeInputTodo(event)} />
              <button className={styles.buttonAdd} onClick={(event) => handleAddTodo(event)} placeholder="add todos here...">+</button></form>
            <p className={styles.info}> Your Tasks: </p>
            <>
              {todos.map((todo) => {
                return (
                  <ul className={styles.todoList}>
                    <li key={todo.id}>
                      <label style={{ textDecoration: todo.complete === true ? "line-through" : "" }} className={styles.labelTodo}><input type="checkbox" onChange={() => handleCompleteTodo(todo.id)} /> {todo.title}</label>
                      <span className={styles.icon} onClick={() => handleRemoveTodo(todo.id)}>X</span>
                    </li>
                  </ul>
                )
              })
              }
            </>
            <p className={styles.info}> Your Complete Tasks: </p>
            <>
              {todos.map((todo) => {
                if (todo.complete)
                  return (
                    <ul className={styles.todoList}>
                      <li key={todo.id}>
                        <label className={styles.labelTodo}> {todo.title}</label>
                        <span className={styles.icon} onClick={() => handleRemoveTodo(todo.id)}>X</span>
                      </li>
                    </ul>
                  )
              })
              }
            </>
          </div>
        </>}
      </main>
      <footer className={styles.footer} >
        Powered by {'  '}<a href="https://www.linkedin.com/in/rodrigo-manozzo-715a8273/" target="_blank"> Rodrigo Manozzo</a>{'  '}e{'  '}<a href="https://www.linkedin.com/in/gabeluiz" target="_blank">Gabriel Palioqui</a>
      </footer>
    </div >
  )
}