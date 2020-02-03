import React, { useState, useMemo } from 'react';
import TodoItem from './TodoItem';
import Footer from './Footer';

const TODO_FILTERS = {
  SHOW_ALL: () => true,
  SHOW_ACTIVE: todo => !todo.completed,
  SHOW_COMPLETED: todo => todo.completed
}

export default function MainSection({ todos, actions }) {
  const [filter, setFilter] = useState('SHOW_ALL');

  const filteredTodos = todos.filter(TODO_FILTERS[filter]);

  const completedCount = todos.reduce((count, todo) => {
    return todo.completed ? count + 1 : count
  }, 0);

  function renderToggleAll(completedCount) {
    if (todos.length > 0) {
      return (
        <input
          className="toggle-all"
          type="checkbox"
          checked={completedCount === todos.length}
          onChange={actions.completeAll}
        />
      )
    }
  }

  function renderFooter(completedCount) {
    const activeCount = todos.length - completedCount;

    if (todos.length) {
      return (
        <Footer
          completedCount={completedCount}
          activeCount={activeCount}
          filter={filter}
          onClearCompleted={actions.clearCompleted}
          onShow={setFilter} />
      )
    }
  }

  return (
    <section className="main">
      {renderToggleAll(completedCount)}
      <ul className="todo-list">
        {filteredTodos.map(todo =>
          <TodoItem key={todo.id} todo={todo} {...actions} />
        )}
      </ul>
      {renderFooter(completedCount)}
    </section>
  )
}