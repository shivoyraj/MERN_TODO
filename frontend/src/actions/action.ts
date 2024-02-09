export const SET_TODOS = 'SET_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const RESET_STATE = 'RESET_STATE';

export const setTodos = (todos) => ({
  type: SET_TODOS,
  payload: todos,
});

export const addTodo = (todo) => ({
  type: ADD_TODO,
  payload: todo,
});

export const removeTodo = (todoId) => ({
  type: REMOVE_TODO,
  payload: todoId,
});

export const updateTodo = (todoId) => ({
  type: UPDATE_TODO,
  payload: todoId,
});

export const resetState = () => ({
  type: RESET_STATE,
});