import React, { useState } from 'react';
import classnames from 'classnames';

export default function TodoInput(props) {
  const [text, setText] = useState(props.text || '');

  function handleSubmit(e) {
    const value = e.target.value.trim();
    if (e.which === 13) {
      props.onSave(value);
      if (props.newTodo) {
        setText('');
      }
    }
  }

  function handleInput(e) {
    setText(e.target.value);
  }

  function handleBlur(e) {
    if (!props.newTodo) {
      props.onSave(e.target.value);
    }
  }

  return (
    <input className={
      classnames({
        edit: props.editing,
        'new-todo': props.newTodo
      })}
      type="text"
      placeholder={props.placeholder}
      autoFocus={true}
      value={text}
      onBlur={handleBlur}
      onChange={handleInput}
      onKeyDown={handleSubmit} />
  )
}