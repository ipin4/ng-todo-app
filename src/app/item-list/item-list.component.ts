import { Store } from '@ngrx/store';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as todosReducer from '../reducers/add-item.reducer';
import * as fromAddActions from '../actions/add-item.actions';
import * as fromListActions from '../actions/item-list.actions';
import { TodosState } from '../reducers/app.states';
import { Todos, ALL_TODOS } from '../models/add-item';
import { FilterParams } from '../models/filter-params';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  todos: Observable<Todos[]>;
  filterParams: FilterParams;
  showedTodos: Array<Todos>;

  constructor(
    private store: Store<TodosState>,
    private router: Router,
    private route: ActivatedRoute) {
    this.todos = store.select(todosReducer.getTodos);
  }

  changeStatus(index) {
    this.store.dispatch(new fromListActions.ChangeStatusAction(ALL_TODOS, index));
  }

  openEdit(id) {
    this.router.navigate([`list/edit/${id}`]);
  }

  updateFilters(params) {
    this.filterParams = params;
    this.setShowedTodos();
    this.sortTodos();
    this.checkOldest();
  }

  setShowedTodos() {
    if (this.filterParams.status !== 'all') {
      this.showedTodos =
        this.filterParams.status === 'done' ?
          ALL_TODOS.filter(todo => todo.isDone) :
          ALL_TODOS.filter(todo => !todo.isDone);
    } else {
      this.showedTodos = ALL_TODOS;
    }
  }

  sortTodos() {
    this.showedTodos =
      this.filterParams.sortby === 'date' ?
      this.showedTodos.sort((a, b) => a.date > b.date ? 1 : -1) :
      this.showedTodos.sort((a, b) => a.title[0] > b.title[0] ? 1 : -1);
  }

  checkOldest() {
    if (this.filterParams.older) {
      const dateValue: any = new Date();
      this.showedTodos = this.showedTodos.filter(todo => {
        const todoDate: any = new Date(todo.date);
        return (dateValue - todoDate - this.filterParams.older * 60 * 1000) > 0;
      });
    }
  }

  ngOnInit() {
    this.store.dispatch(new fromAddActions.AllTodosAction(ALL_TODOS));
    this.route.params
      .subscribe(params => this.updateFilters(params));
    this.todos.subscribe(() => this.setShowedTodos());
  }

}
