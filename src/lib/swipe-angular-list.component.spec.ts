import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwipeAngularListComponent } from './swipe-angular-list.component';

describe('SwipeAngularListComponent', () => {
  let component: SwipeAngularListComponent;
  let fixture: ComponentFixture<SwipeAngularListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwipeAngularListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwipeAngularListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
