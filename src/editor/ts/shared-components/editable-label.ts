import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Output,
  QueryList,
  View,
  ViewQuery
} from 'angular2/core';
import { NgClass, NgIf } from 'angular2/common';

@Component({
  selector: 'vargin-editable-label'
})
@View({
  template: `<div class="vargin-editable-label"
                  [class.vargin-editable-label--write-mode]="writeMode">
               <span *ngIf="!writeMode"
                     class="vargin-editable-label__label"
                     (dblclick)="onDoubleClick($event, editor)">{{ value }}</span>
               <input #editor *ngIf="writeMode"
                      class="vargin-editable-label__editor"
                      (change)="onInputChange(editor.value)"
                      (blur)="onInputBlur(editor.value)"
                      [value]="value"
                      type="text" />
             </div>`,
  directives: [NgClass, NgIf]
})
export class EditableLabel {
  @Input() value: string;
  @Input() allowEditing: boolean = false;

  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  private writeMode: boolean = false;
  private editors: QueryList<ElementRef>;
  private subscription: any;

  constructor(
    @Inject(QueryList) @ViewQuery('editor') editors: QueryList<ElementRef>
  ) {
    this.editors = editors;
  }

  private onDoubleClick(e: MouseEvent) {
    e.stopPropagation();

    if (!this.allowEditing || this.writeMode) {
      return;
    }

    this.writeMode = true;

    this.subscription = this.editors.changes.subscribe(() => {
      if (this.editors.length) {
        this.editors.first.nativeElement.focus();
      }
    });
  }

  private onInputChange(inputValue: string) {
    if (inputValue === this.value) {
      return;
    }

    this.value = inputValue;
    this.valueChange.next(this.value);
  }

  private onInputBlur(inputValue: string) {
    this.writeMode = false;

    this.subscription.unsubscribe();
    this.subscription = null;

    this.onInputChange(inputValue);
  }
}
