import React, { useMemo, useEffect } from 'react';
import useOptimisticReducer from 'use-optimistic-reducer';
import Header from './Header';
import MainSection from './MainSection';
import { getTodo, addTodo, editTodo, deleteTodo } from '../service';

const initialState = { todos: [] };

function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "SET_TODOS":
      return { todos: payload.data };
    case "ADD_TODO":
      return {
        todos: [
          {
            id: payload.id,
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

  useEffect(() => {
    fetchTodos();
  }, []);

  const nextID = useMemo(() => {
    return state.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1
  }, [state.todos]);

  async function fetchTodos() {
    const data = await getTodo();
    dispatch({ type: "SET_TODOS", payload: { data } });
  }

  const actions = {
    addTodo: text => dispatch({
      type: 'ADD_TODO',
      payload: { id: nextID, text },
      optimistic: {
        callback: async () => {
          const data = await addTodo(nextID, text);
          console.log(data);
        },
        fallbackAction: () => {
          alert('Error occurred while adding todo!');
        },
        queue: 'todo'
      }
    }),
    deleteTodo: id => dispatch({
      type: 'DELETE_TODO',
      payload: { id },
      optimistic: {
        callback: async () => {
          const data = await deleteTodo(id);
          console.log(data);
        },
        fallbackAction: () => {
          alert('Error occurred while deleting todo!');
        },
        queue: 'todo'
      }
    }),
    editTodo: (id, text) => dispatch({
      type: 'EDIT_TODO',
      payload: { id, text },
      optimistic: {
        callback: async () => {
          const data = await editTodo(id, text);
          console.log(data);
        },
        fallbackAction: () => {
          alert('Error occurred while editing todo!');
        },
        queue: 'todo'
      }
    }),
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