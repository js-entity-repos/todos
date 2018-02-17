import * as React from 'react';
import Service from '../service/Facade';
import TodoItem from './TodoItem';
import AsyncConnect from './utils/AsyncConnect';

export interface Props {
  readonly service: Service;
}

export default ({ service }: Props) => {
  return (
    <AsyncConnect service={service} render={async () => {
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
    }} />
  );
};
