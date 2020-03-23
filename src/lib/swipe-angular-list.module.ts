import { NgModule } from '@angular/core';
import { SwipeAngularListComponent } from './swipe-angular-list.component';
import { ItemListComponent } from './item-list/item-list.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [SwipeAngularListComponent, ItemListComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot([])
  ],
  exports: [SwipeAngularListComponent, ItemListComponent]
})
export class SwipeAngularListModule { }
