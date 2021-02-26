import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { signIn, signOut, useSession } from 'next-auth/client'

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
      document.title = `Você tem ${filtered.length} tarefa completa.`
    else
      document.title = `Você tem ${filtered.length} tarefas completas.`
  }, [todos]);

  return (
    <div>
      <main className={styles.main}>
        <h1 className={styles.title}>
          To Do List
        </h1>
        {!session && <>
          Not signed in <br />
          <button onClick={() => signIn('google')}>Sign in</button>
        </>}
        {session && <>
          Signed in as {session.user.email} <br />
          <button onClick={() => signOut()}>Sign out</button>
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
                        <span onClick={() => handleRemoveTodo(todo.id)}><FontAwesomeIcon className={styles.icon} icon={faTrash} /></span>
                      </li>
                    </ul>
                  )
              })
              }
            </>
          </div>
        </>}
      </main>
      <footer className={styles.footer}>
        Powered by <a className={styles.code} href="https://www.linkedin.com/in/rodrigo-manozzo-715a8273/" target="_blank"> Rodrigo Manozzo </a> e <a className={styles.code} href="https://www.linkedin.com/in/gabeluiz" target="_blank"> Gabriel Palioqui </a>
      </footer>
    </div >
  )
}