import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SwipeServiceService {
  swipeObserver: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  closeAll(id) {
    this.swipeObserver.emit(id);
  }
}
