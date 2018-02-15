import * as React from 'react';
import Service from '../service/Facade';
import connect from './utils/connect';

const enterKey = 13;

export interface Props {
  readonly service: Service;
}

export default connect(({ service }: Props) => {
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
});
