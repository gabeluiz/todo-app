import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react';



export default function Home() {

  const [todos, setTodos] = useState(['Todo 1', 'Todo 2']);
  const [todo, setTodo] = useState('');

  const removeTodo = todo => {
    setTodos(todos.filter(t => t !== todo));
  }

  console.log(todo);


  return (
    <div className={styles.container}>
      <Head>
        <title>Todos - SIMPLE WAY</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          <h1 className={styles.title}>
            TODOS, SEJA BEM VINDO
        </h1>
        <div className={styles.card}>
          <input value={todo} onChange={e => setTodo(e.target.value)} />
          <button onClick={() => setTodos([...todos, todo])}className={styles.btnAdd}>Adicionar</button>
          <>
            <ul>
              {todos.map((ronaldo) => {
                return (
                  <li>{ronaldo} <button onClick={() => removeTodo(ronaldo)}>X</button></li>
                )
              })
              }
            </ul>

          </>
        </div>
      </main>
      <footer className={styles.footer}>
        Powered by Rodrigo Manozzo e Gabriel Palioqui
      </footer>
    </div>
  )
}