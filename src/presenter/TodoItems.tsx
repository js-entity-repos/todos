import * as React from 'react';
import Service from '../service/Facade';
import TodoItem from './TodoItem';
import asyncRender from './utils/asyncRender';
import connect from './utils/connect';

export interface Props {
  readonly service: Service;
}

export default connect(asyncRender(async ({ service }: Props) => {
  const todos = await service.getRouteTodos();

  return (
    <div>
      <ul className="todo-list">
        {todos.map((todo) => {
          return <TodoItem key={todo.id} todo={todo} service={service} />;
        })}
      </ul>
    </div>
  );
}));
