import TodoEntity from '../utils/TodoEntity';

export default interface Facade {
  readonly changeNewTodoTitle: (title: string) => void;
  readonly createNewTodo: () => Promise<void>;
  readonly deleteCompleted: () => Promise<void>;
  readonly getCompleteCount: () => Promise<number>;
  readonly getEditedTitle: (id: string) => string;
  readonly getIncompleteCount: () => Promise<number>;
  readonly getIsEditing: (id: string) => boolean;
  readonly getNewTodoTitle: () => string;
  readonly getRoute: () => string;
  readonly getRouteTodos: () => Promise<TodoEntity[]>;
  readonly removeTodo: (id: string) => Promise<void>;
  readonly setEditedTitle: (id: string, title: string) => void;
  readonly setIsEditing: (id: string, isEditing: boolean) => void;
  readonly setRoute: (route: string) => void;
  readonly setTodoTitle: (id: string, title: string) => Promise<void>;
  readonly setTodoCompletion: (id: string, completed: boolean) => Promise<void>;
}
