import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAddActions from '../actions/add-item.actions';
import * as fromEditActions from '../actions/item-list.actions';
import { ALL_TODOS } from '../models/add-item';
import { TodosState } from './app.states';

export const initialState: TodosState = { todos: [] };

export function reducer(state = initialState, action: fromAddActions.All | fromEditActions.All): TodosState {
  switch (action.type) {
    case fromAddActions.ALL_TODOS: {
      return {todos: action.payload};
    }
    case fromAddActions.PUT_TODO: {
      return {todos: action.payload};
    }
    case fromEditActions.CHANGE_STATUS: {
      return {todos: action.payload};
    }
    case fromEditActions.CHANGE_TITLE: {
      return {todos: action.payload};
    }
    default: {
      return state;
    }
  }
}

export const getTodosState = createFeatureSelector<TodosState>('todosState');

export const getTodos = createSelector(
    getTodosState,
    (state: TodosState) => state.todos
);
