import * as React from 'react';
import SyncConnect from './utils/SyncConnect';

const enterKey = 13;

export default () => {
  return (
    <SyncConnect render={({ service }): JSX.Element => {
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
