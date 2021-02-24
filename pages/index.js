import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Home() {

  const [input, setInput] = useState({ todoInput: '' });

  const handleChangeInputTodo = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const [todos, setTodos] = useState([
    { id: Math.random(), title: 'todo 1' },
    { id: Math.random(), title: 'todo 2' },
    { id: Math.random(), title: 'todo 3' }
  ]);

  function handleAddTodo() {
    setTodos([...todos, { id: Math.random(), title: input.todoInput }]);
    setInput({ todoInput: '' });
  }
  function handleRemoveTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  function handleCompleteTodo(id){
    const newTodos = todos.map(todo =>{
      return todo.id === id ? {... todo, complete: !todo.complete} : todo;
    });
    setTodos(newTodos);
  }

  useEffect(() => {
    const filtered = todos.filter(todo => todo.complete);
    document.title = `Você tem ${filtered.lengh} todos completos`
  }, [todos]);

  return (
    <div>
      <Head>
        <title>To Do List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
<<<<<<< HEAD
          TODOS LISTS, SEJA BEM VINDO
=======
          To Do List
>>>>>>> c2fb1bd5c3ae7ab989b63efd93850cc8bc305bf2
        </h1>

        <div className={styles.card}>
          <input value={input.todoInput} name={'todoInput'} className={styles.inputAdd} onChange={handleChangeInputTodo} />
          <button className={styles.buttonAdd} onClick={() => handleAddTodo()} placeholder="add todos here...">+</button>


          <p className={styles.info}> Your Todos: </p>
          <>
            {todos.map((todo) => {
              return (
                <ul className={styles.todoList}>
                  <li key={todo.id}>
                    <label style={{ textDecoration: todo.complete === true ? "line-through" : "" }} className={styles.labelTodo}><input type="checkbox" onChange={() => handleCompleteTodo(todo.id)}/> {todo.title}</label>
                    <span onClick={() => handleRemoveTodo(todo.id)}><FontAwesomeIcon className={styles.icon} icon={faTrash} /></span>
                  </li>
                </ul>
              )
            })
            }
          </>
        </div>
      </main>
      <footer className={styles.footer}>
        Powered by Rodrigo Manozzo e Gabriel Palioqui
      </footer>
    </div >
  )
}