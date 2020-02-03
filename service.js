import axios from 'axios';

const API = 'https://my-json-server.typicode.com/aboudicheng/todomvc-optimistic/todos';

export async function addTodo(id, text) {
  try {
    const { data } = await axios.post(API);
    return data;
  }
  catch (e) {
    throw e;
  }
}