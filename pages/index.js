import React, { useState } from 'react';
import Head from 'next/head';
import Footer from './footer';

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  function addTodo() {
    setTodos([...todos, { text: newTodo, completed: false }]);
    setNewTodo('');
  }

  function toggleCompleted(index) {
    setTodos(
      todos.map((todo, i) => {
        if (i === index) {
          return {
            ...todo,
            completed: !todo.completed
          };
        } else {
          return todo;
        }
      })
    );
  }

  function deleteCompleted() {
    setTodos(todos.filter((todo) => !todo.completed));
  }

  function clearAll() {
    setTodos([]);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      addTodo();
    }
  }

  return (
    <div className="container">
      <Head>
        <title>Todo</title>
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <h1>To do</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="button" onClick={addTodo}>Add</button>
        <button className="button" onClick={deleteCompleted}>Delete</button>
        <button className="button" onClick={clearAll}>Purge</button>
      </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompleted(index)}
            />
            <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  );
  
}
