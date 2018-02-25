import * as React from 'react';
import TodoItem from './TodoItem';
import AsyncConnect from './utils/AsyncConnect';

export default () => {
  return (
    <AsyncConnect render={async ({ service }) => {
      const todos = await service.getRouteTodos();

      return (
        <div>
          <ul className="todo-list">
            {todos.map((todo) => {
              return <TodoItem key={todo.id} todo={todo} />;
            })}
          </ul>
        </div>
      );
    }} />
  );
};
