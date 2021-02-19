import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react';



export default function Home() {

  const [todos, setTodos] = useState(['Todo 1', 'Todo 2']);
  const [todo, setTodo] = useState('');

  const removeTodo = todo => {
    setTodos(todos.filter(t => t !== todo));
  }

  return (
    <div>
      <Head>
        <title>Todos - SIMPLE WAY</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          TO-DO LIST, WELCOME.
        </h1>

        <div className={styles.card}>
          <input className={styles.inputAdd} value={todo} onChange={e => setTodo(e.target.value)} />
          <button className={styles.buttonAdd} onClick={() => setTodos([...todos, todo])} placeholder="add todos here...">+</button>

          <div className={styles.list}>
            <p className={styles.info}> Your Todos: </p>
            <>

              {todos.map((ronaldo) => {
                return (
                  <p className={styles.todos}>
                    {ronaldo}
                    <span
                      className={styles.removeBtn}
                      onClick={() => removeTodo(ronaldo)}>

                      x
                    </span>
                  </p>
                )
              })
              }

            </>

          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        Powered by Rodrigo Manozzo e Gabriel Palioqui
      </footer>
    </div >
  )
}