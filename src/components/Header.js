import React from 'react';
import TodoInput from './TodoInput';

export default function Header({ addTodo }) {
  function handleSave(text) {
    if (text.length) {
      addTodo(text);
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <TodoInput
        newTodo
        onSave={handleSave}
        placeholder="What needs to be done?"
      />
    </header>
  )
}