import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react';



export default function Home() {

  const [todos, setTodos] = useState(['Todo 1', 'Todo 2']);
  const [todo, setTodo] = useState('');
  const [completed, setDoneTodo] = useState('');

  const removeTodo = todo => {
    setTodos(todos.filter(t => t !== todo));
  }

  const completeTodo = todo => {
    setDoneTodo(({ ...completed, [todo]: !completed[todo] }));
  }

  return (
    <div>
      <Head>
        <title>Todos - SIMPLE WAY</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          To Do List
        </h1>

        <div className={styles.card}>
          <input className={styles.inputAdd} value={todo} onChange={e => setTodo(e.target.value)} />
          <button className={styles.buttonAdd} onClick={() => setTodos([...todos, todo])} placeholder="add todos here...">+</button>

          <div className={styles.list}>
            <p className={styles.info}> Your Todos: </p>
            <>

              {todos.map((todo, index) => {
                return (
                  
                    <p className={styles.todos} style={{ textDecoration: completed[todo] === true ? "line-through" : "" }}>
                    <input type="checkbox" onChange={() => completeTodo(todo)}/>
                    {todo}
                    <span
                      className={styles.removeBtn}
                      onClick={() => removeTodo(todo)}>
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