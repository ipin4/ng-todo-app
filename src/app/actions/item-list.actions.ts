
import { Action } from '@ngrx/store';
import { Todos } from '../models/add-item';

export const CHANGE_STATUS = 'Change_Status';
export const CHANGE_TITLE = 'Change_Title';

export class ChangeStatusAction implements Action {
  readonly type = CHANGE_STATUS;

  constructor(public payload: Todos[], public index: number) {
    this.payload[this.index].isDone = !this.payload[this.index].isDone;
  }
}

export class ChangeTitleAction implements Action {
  readonly type = CHANGE_TITLE;

  constructor(public payload: Todos[], public index: number, public title: String) {
    this.payload[this.index].title = this.title;
  }
}

export type All = ChangeStatusAction | ChangeTitleAction;
