import {
  Component,
  DynamicComponentLoader,
  Inject,
  Injector,
  OnChanges,
  provide,
  Type,
  View,
  ViewContainerRef
} from 'angular2/angular2';

import { IProperty, Property } from '../../../../core/property';

const CONFIG = new Map<string, string>(<[string, string][]>[
  ['background-color', 'color-property-editor'],
  ['color', 'color-property-editor'],

  ['event', 'event/editor'],

  ['number', 'number-property-editor'],
  ['opacity', 'number-property-editor'],

  ['image', 'image-property-editor'],

  ['string', 'string-property-editor'],
  ['read-only-string', 'read-only-string-property-editor'],

  ['options', 'property-with-options-editor'],

  ['datasource', 'datasource-property-editor'],
  ['items', 'items/editor'],
  ['schema', 'schema/editor'],

  ['trigger', 'trigger/editor'],

  ['url', 'url/editor'],

  ['control-overrides', 'control-overrides/editor']
]);

@Component({
  selector: 'property-editor',
  properties: ['property']
})
@View({
  template: `<div #container hidden></div>`
})
export class PropertyEditor implements OnChanges {
  private loader: DynamicComponentLoader;
  private viewContainer: ViewContainerRef;
  private property: IProperty<any>;

  constructor(
    @Inject(DynamicComponentLoader) loader: DynamicComponentLoader,
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef
  ) {
    this.loader = loader;
    this.viewContainer = viewContainer;
  }

  onChanges() {
    if (!this.property) {
      return;
    }

    PropertyEditor.getEditorType(this.property).then((PropertyEditorType) => {
      return this.loader.loadIntoLocation(
        PropertyEditorType,
        this.viewContainer.element,
        'container',
        Injector.resolve([provide(Property, { useValue: this.property })])
      );
    });
  }

  static getEditorType(property: IProperty<any>): Promise<Type> {
    let propertyType = 'getOptions' in property ?
      'options' : property.getType();

    let editorPath = CONFIG.get(propertyType) || CONFIG.get('string');

    return System.import(
      `src/editor/ts/properties/property-editors/${editorPath}`
    ).then(
      (module: any) => <Type>module.PropertyEditor
    );
  }
}
