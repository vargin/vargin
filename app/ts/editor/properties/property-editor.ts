/// <reference path="../../../../typings/tsd.d.ts" />
import {
  bind,
  Component,
  DynamicComponentLoader,
  Inject,
  Injector,
  onChange,
  View,
  ViewContainerRef
} from 'angular2/angular2';

import { ControlProperty } from 'core/controls/control-property';

import NumberPropertyEditor from 'editor/properties/number-property-editor';
import StringPropertyEditor from 'editor/properties/string-property-editor';

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
  private property: ControlProperty<any>;

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
        this.getEditorType(this.property),
        this.viewContainer.element,
        'container',
        Injector.resolve([bind(ControlProperty).toValue(this.property)])
      )
    });
  }

  getEditorType(property: ControlProperty<any>): Type {
    var propertyType = typeof property.value;
    switch(propertyType) {
      case 'string':
        return StringPropertyEditor;
      case 'number':
        return NumberPropertyEditor;
      default:
        throw new Error(
          '[PropertyEditor] Property type is not supported: ' + propertyType
        );
    }
  }
}

export default PropertyEditor;