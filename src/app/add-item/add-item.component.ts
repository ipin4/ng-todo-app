import { Store } from '@ngrx/store';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as todosReducer from '../reducers/add-item.reducer';
import * as fromAddActions from '../actions/add-item.actions';
import * as fromListActions from '../actions/item-list.actions';
import { TodosState } from '../reducers/app.states';
import { Todos, ALL_TODOS } from '../models/add-item';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  todos: Observable<Todos[]>;
  value: String = '';
  currentId: String = '';
  isEdit: Boolean = false;
  index: any;
  validationClass: String = 'not-valid';

  constructor(private store: Store<TodosState>, private router: Router, private route: ActivatedRoute) {
    this.todos = store.select(todosReducer.getTodos);
  }

  onValueChanged() {
    this.validationClass = this.value.length > 20 ? 'valid' : 'not-valid';
  }

  addTodo() {
    if (this.validationClass === 'not-valid') {
      return;
    }
    const newItem = {
      date: new Date(),
      id: `_${Math.random().toString(36).substr(2, 9)}`,
      title: this.value,
      isDone: false
    };

    this.store.dispatch(new fromAddActions.PutTodoAction(ALL_TODOS, newItem));
    this.router.navigate(['/list']);
  }

  editTodo() {
    if (this.validationClass === 'not-valid') {
      return;
    }
    this.store.dispatch(new fromListActions.ChangeTitleAction(ALL_TODOS, this.index, this.value));
    this.router.navigate(['/list']);
  }

  ngOnInit() {
    this.currentId = this.route.snapshot.params['id'];

    if (this.currentId && ALL_TODOS.length) {
      this.isEdit = true;
      this.index = ALL_TODOS.findIndex(i => i.id === this.currentId);
      this.value = ALL_TODOS[this.index].title;
      this.onValueChanged();
    }
  }

}
