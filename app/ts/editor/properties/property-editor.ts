/// <reference path="../../../../typings/tsd.d.ts" />
import {
  bind,
  Component,
  DynamicComponentLoader,
  Inject,
  Injector,
  onChange,
  View,
  ViewContainerRef,
  Type
} from 'angular2/angular2';

import { IProperty, Property } from 'core/property';

import NumberPropertyEditor from 'editor/properties/number-property-editor';
import StringPropertyEditor from 'editor/properties/string-property-editor';
import PropertyWithOptionsEditor from
  'editor/properties/property-with-options-editor';

@Component({
  selector: 'property-editor',
  properties: ['property'],
  lifecycle: [onChange]
})

@View({
  template: `<div #container></div>`
})

class PropertyEditor {
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

  onChange() {
    if (!this.property) {
      return;
    }

    setTimeout(() => {
      this.loader.loadIntoLocation(
        PropertyEditor.getEditorType(this.property),
        this.viewContainer.element,
        'container',
        Injector.resolve([bind(Property).toValue(this.property)])
      )
    });
  }

  static getEditorType(property: IProperty<any>): Type {
    var propertyType = 'getOptions' in property ?
      'options' : property.getType();
    switch(propertyType) {
      case 'background-color':
      case 'border':
      case 'color':
      case 'text-decoration':
      case 'string':
        return StringPropertyEditor;
      case 'opacity':
      case 'number':
        return NumberPropertyEditor;
      case 'options':
        return PropertyWithOptionsEditor;
      default:
        throw new Error(
          '[PropertyEditor] Property type is not supported: ' + propertyType
        );
    }
  }
}

export default PropertyEditor;