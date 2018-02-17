import * as React from 'react';
import Service from '../service/Facade';
import SyncConnect from './utils/SyncConnect';

const enterKey = 13;

export interface Props {
  readonly service: Service;
}

export default ({ service }: Props) => {
  return (
    <SyncConnect service={service} render={() => {
      const newTodoTitle = service.getNewTodoTitle();

      return (
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={newTodoTitle}
          onChange={(event) => {
            service.changeNewTodoTitle((event.target as any).value);
          }}
          onKeyDown={async (event) => {
            if (event.keyCode === enterKey) {
              await service.createNewTodo();
              service.changeNewTodoTitle('');
            }
          }}
        />
      );
    }} />
  );
};
