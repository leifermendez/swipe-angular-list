import { NgModule } from '@angular/core';
import { SwipeAngularListComponent } from './swipe-angular-list.component';
import { ItemListComponent } from './item-list/item-list.component';
import {CommonModule} from '@angular/common';



@NgModule({
  declarations: [SwipeAngularListComponent, ItemListComponent],
  imports: [
    CommonModule
  ],
  exports: [SwipeAngularListComponent, ItemListComponent]
})
export class SwipeAngularListModule { }
