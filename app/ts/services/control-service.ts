/// <reference path="../../../typings/tsd.d.ts" />
import { EventEmitter, Type } from 'angular2/angular2';

import { IProperty, Property, PropertyWithOptions } from 'core/property';
import {
  ControlProperty,
  ControlPropertyWithOptions
} from 'core/controls/control-property';
import { ControlMetadata } from 'core/controls/control-metadata';
import {
  VisualControlMetadata
} from 'core/controls/visual/visual-control-metadata';

import BaseControl from 'core/controls/base-control';
import ButtonControl from 'core/controls/visual/button-control';
import ContainerControl from 'core/controls/visual/container-control';
import DatasourceControl from 'core/controls/service/datasource-control';
import LabelControl from 'core/controls/visual/label-control';
import RangeControl from 'core/controls/visual/range-control';

import { StyleService } from 'services/style-service';
import { ControlGroup } from 'core/controls/control-group';

import { UtilsService } from 'services/utils-service';

interface IControlTypeDescription {
  meta: ControlMetadata,
  controlClass: any
}

const CONTROLS = new Map<string, IControlTypeDescription>([
  [
    'button', {
      controlClass: ButtonControl,
      meta: new VisualControlMetadata(
        'button',
        'Button',
        'HTML Button',
        ['click', 'hover'],
        new Map<string, IProperty<string>>([
          ['text', new Property('Text', '[Text]')],
          ['title', new Property('Title', '[Title]')],
          ['type', new PropertyWithOptions('Type', [
            new Property('Submit', 'submit'),
            new Property('Reset', 'reset'),
            new Property('Button', 'button')
          ])]
        ]),
        new Map<string, IProperty<string>>([
          ['color', StyleService.getMetadata('color')],
          [
            'background-color',
            new ControlProperty(
              StyleService.getMetadata('background-color'), '#333333'
            )
          ],
          ['border', StyleService.getMetadata('border')]
        ])
      )
    }
  ],
  [
    'container', {
      controlClass: ContainerControl,
      meta: new VisualControlMetadata(
        'container',
        'Container',
        'Container',
        ['click', 'hover'],
        null,
        new Map<string, IProperty<string>>([
          ['background-color', StyleService.getMetadata('background-color')],
          [
            'border',
            new ControlProperty(
              StyleService.getMetadata('border'), '1px solid red'
            )
          ],
          ['color', StyleService.getMetadata('color')],
          [
            'min-height',
            new ControlProperty(
              StyleService.getMetadata('min-height'), '5rem'
            )
          ]
        ])
      )
    }
  ],
  [
    'datasource', {
      controlClass: DatasourceControl,
      meta: new ControlMetadata(
        'datasource', 'Data Source', 'Custom Data Source'
      )
    }
  ],
  [
    'label', {
      controlClass: LabelControl,
      meta: new VisualControlMetadata(
        'label',
        'Label',
        'HTML Label',
        ['click', 'hover'],
        new Map<string, IProperty<string>>([
          ['text', new Property('Text', '[Text]')]
        ]),
        new Map<string, IProperty<string>>([
          ['color', StyleService.getMetadata('color')],
          [
            'background-color',
            new ControlProperty(
              StyleService.getMetadata('background-color'), '#cccaaa'
            )
          ],
          ['text-decoration', StyleService.getMetadata('text-decoration')],
        ])
      )
    }
  ],
  [
    'range', {
      controlClass: RangeControl,
      meta: new VisualControlMetadata(
        'range',
        'Number Range',
        'Number Range',
        ['change'],
        new Map<string, IProperty<string>>([
          ['min', new Property('Minimum', '0')],
          ['max', new Property('Maximum', '100')],
          ['step', new Property('Step', '1')],
          ['value', new Property('Value', '0')],
        ]),
        new Map<string, IProperty<string>>([
          ['opacity', StyleService.getMetadata('opacity')]
        ])
      )
    }
  ]
]);

export class ControlService {
  private static _activeControl: BaseControl;

  static controlSelected: EventEmitter = new EventEmitter();

  get activeControl() {
    return ControlService._activeControl;
  }

  static selectControl(control: BaseControl) {
    if (control !== this._activeControl) {
      ControlService._activeControl = control;
      ControlService.controlSelected.next(control);
    }
  }

  static getMetadata(type: string): ControlMetadata {
    if (!CONTROLS.has(type)) {
      throw new Error('Type is not supported: ' + type);
    }

    return CONTROLS.get(type).meta;
  }

  static create<TControl extends BaseControl>(
    type: string,
    properties?: Map<string, string>,
    styles?: Map<string, string>
  ): TControl {
    if (!CONTROLS.has(type)) {
      throw new Error('Not supported component type: ' + type);
    }

    var controlDescription = CONTROLS.get(type);
    return <TControl>(new controlDescription.controlClass(
      UtilsService.uuid(),
      controlDescription.meta,
      properties,
      styles
    ));
  }
}
