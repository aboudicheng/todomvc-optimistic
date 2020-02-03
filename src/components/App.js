import React, { useState } from 'react'
import Header from './Header'
import MainSection from './MainSection'

const initialState = [
  {
    text: 'React ES6 TodoMVC',
    completed: false,
    id: 0
  }
]

export default function App() {
  const [todos, setTodos] = useState([]);
  const [gameID, setGameID] = useState(null);
  const [player, setPlayer] = useState(0);

  function addTodo(text) {
    setTodos(prev => [
      {
        id: prev.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
        completed: false,
        text
      },
      ...prev
    ]);
  }

  function deleteTodo(id) {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }

  function editTodo(id, text) {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, text } : todo
    ));
  }

  function completeTodo(id) {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }

  function completeAll() {
    const areAllMarked = todos.every(todo => todo.completed);
    setTodos(prev => prev.map(todo => {
      return { ...todo, completed: !areAllMarked };
    }));
  }

  function clearCompleted() {
    setTodos(prev => prev.filter(todo => todo.completed === false));
  }

  const actions = {
    addTodo,
    deleteTodo,
    editTodo,
    completeTodo,
    completeAll,
    clearCompleted
  };

  return (
    <div>
      <Header addTodo={actions.addTodo} />
      <MainSection todos={todos} actions={actions} />
    </div>
  )
}