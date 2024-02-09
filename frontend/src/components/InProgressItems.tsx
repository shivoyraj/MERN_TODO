import React from 'react';
import TodoSection from './TodoSection';

interface Todo {
  _id: string;
  description: string;
  status: string;
}

interface InProgressItemsProps {
  todos: Todo[];
}

function InProgressItems({ todos }: InProgressItemsProps) {
  return (
    <div>
      <h3>In Progress Items</h3>
      <TodoSection status="inprogress" todos={todos} />
    </div>
  );
}

export default InProgressItems;