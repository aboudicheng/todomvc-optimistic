import React from 'react';
import useOptimisticReducer from 'use-optimistic-reducer';
import Header from './Header';
import MainSection from './MainSection';

const initialState = { todos: [] };

function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "ADD_TODO":
      return {
        todos: [
          {
            id: state.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
            completed: false,
            text: payload.text
          },
          ...state.todos
        ]
      };
    case "DELETE_TODO":
      return { todos: state.todos.filter(todo => todo.id !== payload.id) };
    case "EDIT_TODO":
      return {
        todos: state.todos.map(todo =>
          todo.id === payload.id ? { ...todo, text: payload.text } : todo
        )
      };
    case "COMPLETE_TODO":
      return {
        todos: state.todos.map(todo =>
          todo.id === payload.id ? { ...todo, completed: !todo.completed } : todo
        )
      };
    case "COMPLETE_ALL":
      const areAllMarked = state.todos.every(todo => todo.completed);
      return {
        todos: state.todos.map(todo => {
          return { ...todo, completed: !areAllMarked };
        })
      };
    case "CLEAR_COMPLETED":
      return { todos: state.todos.filter(todo => todo.completed === false) };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useOptimisticReducer(reducer, initialState);

  const actions = {
    addTodo: text => dispatch({ type: 'ADD_TODO', payload: { text } }),
    deleteTodo: id => dispatch({ type: 'DELETE_TODO', payload: { id } }),
    editTodo: (id, text) => dispatch({ type: 'EDIT_TODO', payload: { id, text } }),
    completeTodo: id => dispatch({ type: 'COMPLETE_TODO', payload: { id } }),
    completeAll: () => dispatch({ type: 'COMPLETE_ALL' }),
    clearCompleted: () => dispatch({ type: 'CLEAR_COMPLETED' })
  };

  return (
    <div>
      <Header addTodo={actions.addTodo} />
      <MainSection todos={state.todos} actions={actions} />
    </div>
  )
}