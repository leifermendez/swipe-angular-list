# Swiper List (Angular)

You can now have a swipe effect on your angle application, with which you can place delete or edit options. Ideal for task list or contacts

<p align="center">
    <img src="https://i.imgur.com/qMXkbXm.gif" alt="Preview" />
</p>


### Install
`npm i swipe-angular-list --save`

### Import
```typescript
import {BrowserModule} from '@angular/platform-browser';  
import {NgModule} from '@angular/core';  
import {AppComponent} from './app.component';  

import {SwipeAngularListModule} from 'swipe-angular-list';  // <------ IMPORT
  
@NgModule({  
  declarations: [  
    AppComponent  
  ],  
  imports: [  
    BrowserModule,  
  SwipeAngularListModule   // <------ IMPORT
  ],  
  providers: [],  
  bootstrap: [AppComponent]  
})  
export class AppModule {  
}
```

### Use
Use in your component
```typescript
import { Component } from '@angular/core';  
  
@Component({  
  selector: 'app-root',  
  templateUrl: './app.component.html',  
  styleUrls: ['./app.component.css']  
})  
export class AppComponent {  
  title = 'for-test';  
  list = [  
      {  
		  id: 1,  
		  title: 'Realizar la tarea asignada!',  
		  subTitle: '9:00pm'  
	  },  
	  {  
		  id: 2,  
		  title: 'Visitar al perro en casa de tu amiga',  
		  subTitle: '9:00pm'  
	  },  
	  {  
		  id: 3,  
		  title: 'Llamar al doctor',  
		  subTitle: '9:00pm'  
	  },  
	  {  
		  id: 4,  
		  title: 'Buscar el auto en el taller',  
		  subTitle: '9:00pm'  
	  }  
    ];  
  
  
  action = (a) => {  
      console.log(a);  
  };  
}
```

### Template
```html
<div>  

 <h3 style="text-align: center">Task List</h3>  
 
 <div> <sw-item-list  *ngFor="let item of list"  
  [inside]="item"  
  [item-class]="'list-custom'"  
  [editTemplate]="editTemplate"  
  [trashTemplate]="trashTemplate"  
  (callback)="action($event)">  
  
 </sw-item-list>  
 </div>
 </div>  
 
 !<-- Defined yout template for icon button (edit)-->
<ng-template #editTemplate>  
 <i class="fas fa-edit"></i>  
</ng-template>  
 !<-- Defined yout template for icon button (trash)-->
<ng-template #trashTemplate>  
 <i class="fas fa-trash"></i>  
</ng-template>
```
### Options

__item__ structure defined :
``` text
   {
      id: 1,
      title: 'Realizar la tarea asignada!',
      subTitle: '9:00pm'
    }
```
__item-class__ name of style class custom.

__show-mark__ boolean show icon done or not

__editTemplate__ template for edit button

__trashTemplate__ template for trash button

__markTemplate__ template for icon check template

__notMarkTemplate__ template for icon not check template

__(callback)__ function callback click option

``` html
    <sw-item-list
      *ngFor="let item of list"
      [inside]="item"
      [item-class]="'list-custom'"
      [show-mark]="true"
      [editTemplate]="editTemplate"
      [trashTemplate]="trashTemplate"
      [markTemplate]="defaultMark"
      [notMarkTemplate]="defaultNotMark"
      (callback)="action($event)">
    </sw-item-list>
```
