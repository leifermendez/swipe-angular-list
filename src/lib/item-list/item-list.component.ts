import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild, ViewContainerRef
} from '@angular/core';
import {
  HammerGestureConfig,
} from '@angular/platform-browser';
import {fromEvent} from 'rxjs';
import {takeWhile} from 'rxjs/operators';
import * as Hammer from 'hammerjs';
import {SwipeServiceService} from '../swipe-service.service';

@Component({
  selector: 'sw-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements AfterViewInit {
  alive = true;
  result: boolean;
  selfElement = null;
  idElement = null;
  @Input() inside: {
    id,
    title: '',
    subTitle: '',
    mark: false,
  };

  @Input('disable-mark') disabledMark = false;

  @Input('show-mark') showMark = false;

  @Input('item-class') itemClass = '';

  // @ts-ignore
  @ViewChild('defaultEdit') defaultEdit: TemplateRef<any>;
  // @ts-ignore
  @ViewChild('defaultTrash') defaultTrash: TemplateRef<any>;

  // @ts-ignore
  @ViewChild('defaultMark') defaultMark: TemplateRef<any>;
  // @ts-ignore
  @ViewChild('defaultNotMark') defaultNotMark: TemplateRef<any>;
  // @ts-ignore
  @ViewChild('defaultCustom') defaultCustom: TemplateRef<any>;

  // tslint:disable-next-line:no-input-rename
  @Input('customTemplate') customTemplate: TemplateRef<any>;
  // tslint:disable-next-line:no-input-rename
  @Input('editTemplate') editTemplate: TemplateRef<any>;
  // tslint:disable-next-line:no-input-rename
  @Input('trashTemplate') trashTemplate: TemplateRef<any>;
  // tslint:disable-next-line:no-input-rename
  @Input('markTemplate') markTemplate: TemplateRef<any>;
  // tslint:disable-next-line:no-input-rename
  @Input('notMarkTemplate') notMarkTemplate: TemplateRef<any>;

  @Output()
  callback = new EventEmitter<any>();

  @Output()
  swClick = new EventEmitter<any>();

  @ViewChild('viewContainerEdit', {static: false, read: ViewContainerRef})
  viewContainerEdit: ViewContainerRef;

  @ViewChild('viewContainerTrash', {static: false, read: ViewContainerRef})
  viewContainerTrash: ViewContainerRef;

  @ViewChild('viewContainerMark', {static: false, read: ViewContainerRef})
  viewContainerMark: ViewContainerRef;

  @ViewChild('viewContainerCustom', {static: false, read: ViewContainerRef})
  viewContainerCustom: ViewContainerRef;

  // @ViewChild('tpl') tpl: TemplateRef<any>

  @HostListener('document:click', ['$event'])
  clickOut(event) {
    if (!this.selfElement.contains(event.target)) {
      this.result = false;
    }
  }

  constructor(elRef: ElementRef, private swService: SwipeServiceService) {
    this.selfElement = elRef.nativeElement;
    this.idElement = `list-swipe-${this.random()}`;
    this.selfElement.setAttribute('data-id', this.idElement);
    this.selfElement.id = this.idElement;
    this.swService.swipeObserver.subscribe(a => {
      if (a !== this.selfElement.id) {
        this.result = false;
      }
    });
  }

  private random = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  private getParent = (arr = []) => {
    return new Promise((resolve, reject) => {
      arr.map(a => {
        if (/list-swipe/.test(a.id)) {
          resolve(a.id);
        }
      });
    });

  };

  clickItem = (a: any) => this.swClick.emit(a);

  action = (opt = '') => {
    try {
      this.result = false;
      const {id} = this.inside;
      if (opt === 'edit') {
        this.callback.emit({action: 'edit', value: id});
      } else if (opt === 'trash') {
        this.callback.emit({action: 'trash', value: id});
      }
    } catch (e) {
      console.log('Debes definir ID de edit, y trash');
    }
  };

  ngAfterViewInit(): void {

    if (this.showMark) {
      if (this.inside.mark && !this.markTemplate) {
        const viewMark = this.defaultMark.createEmbeddedView(null);
        this.viewContainerMark.insert(viewMark);
      } else if (this.inside.mark && this.markTemplate) {
        const viewMark = this.markTemplate.createEmbeddedView(null);
        this.viewContainerMark.insert(viewMark);
      }

      if (!this.inside.mark && !this.notMarkTemplate) {
        const viewMark = this.defaultNotMark.createEmbeddedView(null);
        this.viewContainerMark.insert(viewMark);
      } else if (!this.inside.mark && this.notMarkTemplate) {
        const viewMark = this.notMarkTemplate.createEmbeddedView(null);
        this.viewContainerMark.insert(viewMark);
      }
    }

    if (this.editTemplate) {
      const viewEdit = this.editTemplate.createEmbeddedView(null);
      if (this.viewContainerEdit) {
        this.viewContainerEdit.insert(viewEdit);
      }
    } else if (this.editTemplate !== null) {
      const viewEdit = this.defaultEdit.createEmbeddedView(null);
      this.viewContainerEdit.insert(viewEdit);
    }

    if (this.trashTemplate) {
      const viewTrash = this.trashTemplate.createEmbeddedView(null);
      if (this.viewContainerTrash) {
        this.viewContainerTrash.insert(viewTrash);
      }
    } else if (this.trashTemplate !== null) {
      const viewTrash = this.defaultTrash.createEmbeddedView(null);
      this.viewContainerTrash.insert(viewTrash);
    }

    setTimeout(() => {
      if (this.customTemplate) { // Si tiene
        const viewCustomTemplate = this.customTemplate.createEmbeddedView({
          item: this.inside,
          id: this.selfElement.id
        });

        // @ts-ignore
        viewCustomTemplate._view.nodes.map(e => {
          if (e && e.renderElement && e.renderElement.attributes) {
            // console.log(renderElement.childNodes)

            Object.keys(e.renderElement.childNodes).map(r => {
              // tslint:disable-next-line:radix
              e.renderElement.childNodes[parseInt(r)].id = this.selfElement.id;
            });

          }
        });

        if (viewCustomTemplate) {
          this.viewContainerCustom.insert(viewCustomTemplate);
        }
      } else {
        const viewCustomTemplate = this.defaultCustom.createEmbeddedView(null);
        this.viewContainerCustom.insert(viewCustomTemplate);
      }
    });


    const hammer = new Hammer(this.selfElement);
    fromEvent(hammer, 'swipe').pipe(
      takeWhile(() => this.alive))
      .subscribe((res: any) => {
        this.swService.closeAll(this.selfElement.id);
        if (!this.disabledMark) {
          // @ts-ignore
          const {id} = Object.values(res.srcEvent.target.parentNode.children).find(b => true);
          if (id && (typeof id === 'string') && (/list-swipe/.test(id))) {
            if (id === this.selfElement.id) {
              this.result = (res.deltaX < 0);
            }
          }
        }
      });
  }

}
