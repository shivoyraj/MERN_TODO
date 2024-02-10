import React from 'react';
import TodoSection from './TodoSection';
import '../styles/style.css'

interface Todo {
  _id: string;
  description: string;
  status: string;
}

interface TodoItemsProps {
  todos: Todo[];
}

function TodoItems({ todos }: TodoItemsProps) {
  return (
    <div>
      <h3>Todo Items</h3>
      <div id="todoSection"><TodoSection status="todo" todos={todos} /></div>
    </div>
  );
}

export default TodoItems;