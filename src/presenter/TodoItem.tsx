import * as React from 'react';
import TodoEntity from '../utils/TodoEntity';
import SyncConnect from './utils/SyncConnect';

const enterKey = 13;
const escapeKey = 27;

export interface Props {
  readonly todo: TodoEntity;
}

export default ({ todo }: Props) => {
  return (
    <SyncConnect render={({ service }) => {
      const isEditing = service.getIsEditing(todo.id);
      const editedTitle = service.getEditedTitle(todo.id);

      const handleSave = async () => {
        const title = editedTitle.trim();
        if (title.length === 0) {
          await service.removeTodo(todo.id);
          return;
        }
        service.setEditedTitle(todo.id, title);
        service.setIsEditing(todo.id, false);
        await service.setTodoTitle(todo.id, title);
      };

      return (
        <li className={`${todo.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={todo.completed}
              onChange={async () => {
                await service.setTodoCompletion(todo.id, !todo.completed);
              }}
            />
            <label onDoubleClick={async () => {
              service.setEditedTitle(todo.id, todo.title);
              service.setIsEditing(todo.id, true);
            }}>
              {todo.title}
            </label>
            <button className="destroy" onClick={async () => {
              await service.removeTodo(todo.id);
            }} />
          </div>
          <input
            className="edit"
            value={editedTitle}
            onBlur={handleSave}
            onChange={async (event) => {
              service.setEditedTitle(todo.id, (event.target as any).value);
            }}
            onKeyDown={async (event) => {
              if (event.keyCode === escapeKey) {
                service.setEditedTitle(todo.id, todo.title);
                service.setIsEditing(todo.id, false);
              } else if (event.keyCode === enterKey) {
                await handleSave();
              }
            }}
          />
        </li>
      );
    }} />
  );
};
