import React from 'react';
import TodoSection from './TodoSection';

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
      <TodoSection status="todo" todos={todos} />
    </div>
  );
}

export default TodoItems;