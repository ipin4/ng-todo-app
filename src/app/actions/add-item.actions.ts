
import { Action } from '@ngrx/store';
import { Todos } from '../models/add-item';

export const ALL_TODOS = 'All_Todos';
export const PUT_TODO = 'Put_Todo';

export class AllTodosAction implements Action {
  readonly type = ALL_TODOS;

  constructor(public payload: Todos[]) {}
}

export class PutTodoAction implements Action {
  readonly type = PUT_TODO;

  constructor(public payload: Todos[], public item: Todos) {
    this.payload.push(this.item);
  }
}

export type All = AllTodosAction | PutTodoAction;
