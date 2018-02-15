import EntitiesFacade from '@js-entity-repos/core/dist/Facade';
import TodoEntity from '../utils/TodoEntity';

export default interface Facade {
  readonly getEditedTitle: (id: string) => string;
  readonly getIsEditing: (id: string) => boolean;
  readonly getNewTodoTitle: () => string;
  readonly getRoute: () => string;
  readonly setEditedTitle: (id: string, title: string) => void;
  readonly setIsEditing: (id: string, isEditing: boolean) => void;
  readonly setNewTodoTitle: (title: string) => void;
  readonly setRoute: (route: string) => void;
  readonly todos: EntitiesFacade<TodoEntity>;
}
