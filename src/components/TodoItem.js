import React, { useState } from 'react';
import classnames from 'classnames';
import TodoInput from './TodoInput';

export default function TodoItem({ todo, editTodo, deleteTodo, completeTodo }) {
  const [editing, setEditing] = useState(false);

  function handleSave(id, text) {
    if (!text.length) {
      deleteTodo(id);
    }
    else {
      editTodo(id, text);
    }
    setEditing(false);
  }

  let element;
  if (editing) {
    element = (
      <TodoInput
        text={todo.text}
        editing={editing}
        onSave={(text) => handleSave(todo.id, text)}
      />
    )
  }
  else {
    element = (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => completeTodo(todo.id)}
        />
        <label onDoubleClick={() => setEditing(true)}>{todo.text}</label>
        <button className="destroy" onClick={() => deleteTodo(todo.id)} />
      </div>
    )
  }

  return (
    <li className={classnames({
      completed: todo.completed,
      editing
    })}>
      {element}
    </li>
  )
}