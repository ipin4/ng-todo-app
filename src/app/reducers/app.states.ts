import { Todos } from '../models/add-item';

export interface AppState {
  todosState: TodosState;
}

export interface TodosState {
  todos: Todos[];
}
