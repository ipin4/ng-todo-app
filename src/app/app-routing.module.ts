import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ItemListComponent } from './item-list/item-list.component';
import { AddItemComponent } from './add-item/add-item.component';

const routes: Routes = [
  { path: 'list/add', component: AddItemComponent },
  { path: 'list/edit/:id', component: AddItemComponent },
  { path: 'about', component: AboutComponent },
  { path: 'list', component: ItemListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
