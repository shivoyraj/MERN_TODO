import React from 'react';
import TodoSection from './TodoSection';

interface Todo {
  _id: string;
  description: string;
  status: string;
}

interface CompletedItemsProps {
  todos: Todo[];
}

function CompletedItems({ todos }: CompletedItemsProps) {
  return (
    <div>
      <h3>Completed Items</h3>
      <TodoSection status="completed" todos={todos} />
    </div>
  );
}

export default CompletedItems;