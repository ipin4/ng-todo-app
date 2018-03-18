import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {
  types: Array<String> = ['All', 'Done', 'Not Done'];
  selectedFilterValue = this.types[0];
  status: String = 'all';

  sortTypes: Array<String> = ['Date', 'Letter'];
  selectedSortValue = this.sortTypes[0];
  sortby: String = 'date';

  oldest: number;
  older: number;

  constructor(private router: Router) { }

  prepareValue(value) {
    return value.toLocaleLowerCase().replace(' ', '');
  }

  setRouterValue() {
    let routerParams;
    if (this.older) {
      routerParams = { status: this.status, sortby: this.sortby, older: this.older };
    } else {
      routerParams = { status: this.status, sortby: this.sortby };
    }
    this.router.navigate(['/list', routerParams]);
  }

  onSetTypeList() {
    this.status = this.prepareValue(this.selectedFilterValue);
    this.setRouterValue();
  }

  onSetSortValue() {
    this.sortby = this.prepareValue(this.selectedSortValue);
    this.setRouterValue();
  }

  onOldestChanged() {
    this.older = Math.abs(this.oldest);
    this.setRouterValue();
  }

  ngOnInit() {
    this.setRouterValue();
  }

}
