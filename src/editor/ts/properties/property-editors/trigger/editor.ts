import {
  Component,
  EventEmitter,
  Inject,
  Input,
  Optional,
  Output,
  provide,
  View
} from 'angular2/core';

import { IProperty, Property } from '../../../../../core/property';
import { Trigger } from '../../../../../core/triggers/trigger';
import { DialogService } from '../../../services/dialog-service';
import { PropertyListDialog, IDialogResult } from './list-dialog';

@Component({
  selector: 'trigger-property-editor',
  properties: ['property']
})
@View({
  template: `
    <label class="vargin-property-editor">
      <span class="vargin-property-editor__label">{{property.getValue().name}}</span>
      <div class="vargin-property-editor__input flex-editor__input">
        <button type="button" (click)="change()">...</button>
      </div>
    </label>`
})
export class PropertyEditor {
  @Output() remove = new EventEmitter();

  @Input() property: IProperty<Trigger>;

  constructor(@Optional() @Inject(Property) property?: IProperty<Trigger>) {
    this.property = property;
  }

  change() {
    return DialogService.show(
      PropertyListDialog,
      [provide(Trigger, { useValue: this.property.getValue() })]
    ).then((dialogResult: IDialogResult = {}) => {
      if (dialogResult.remove) {
        this.remove.next(null);
      }
    });
  }
}
