import TodoEntity from '../utils/TodoEntity';

// tslint:disable:readonly-keyword
export interface State {
  editedTitles: { [id: string]: string };
  isEditing: { [id: string]: boolean };
  newTodoTitle: string;
  route: string;
  todos: TodoEntity[];
}
// tslint:enable:readonly-keyword

export default interface FactoryConfig {
  readonly getState: () => State;
  readonly patchState: (state: Partial<State>) => void;
}
