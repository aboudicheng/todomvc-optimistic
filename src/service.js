import axios from 'axios';

const API = 'https://my-json-server.typicode.com/aboudicheng/todomvc-optimistic/todos';

export async function getTodo() {
  try {
    const { data } = await axios.get(API);
    return data;
  }
  catch (e) {
    throw e;
  }
}

export async function addTodo(id, text) {
  try {
    const { data } = await axios.post(API, {
      id,
      completed: false,
      text
    });
    return data;
  }
  catch (e) {
    throw e;
  }
}

export async function editTodo(id, text) {
  try {
    const { data } = await axios.put(`${API}/${id}`, {
      text
    });
    return data;
  }
  catch (e) {
    throw e;
  }
}

export async function deleteTodo(id) {
  try {
    const { data } = await axios.delete(`${API}/${id}`);
    return data;
  }
  catch (e) {
    throw e;
  }
}