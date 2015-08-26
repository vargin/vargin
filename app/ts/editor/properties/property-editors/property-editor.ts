/// <reference path="../../../../../typings/tsd.d.ts" />
import {
  bind,
  Component,
  DynamicComponentLoader,
  Inject,
  Injector,
  LifecycleEvent,
  View,
  ViewContainerRef,
  Type
} from 'angular2/angular2';

import { IProperty, Property } from 'core/property';

import ColorPropertyEditor from 'editor/properties/property-editors/color-property-editor';
import NumberPropertyEditor from 'editor/properties/property-editors/number-property-editor';
import StringPropertyEditor from 'editor/properties/property-editors/string-property-editor';
import PropertyWithOptionsEditor from 'editor/properties/property-editors/property-with-options-editor';
import EventPropertyEditor from 'editor/properties/property-editors/event-property-editor';
import ImagePropertyEditor from 'editor/properties/property-editors/image-property-editor';

@Component({
  selector: 'property-editor',
  properties: ['property'],
  lifecycle: [LifecycleEvent.onChange]
})
@View({
  template: `<div #container hidden></div>`
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
      case 'color':
        return ColorPropertyEditor;
      case 'opacity':
      case 'number':
        return NumberPropertyEditor;
      case 'options':
        return PropertyWithOptionsEditor;
      case 'click':
      case 'hover':
      case 'change':
        return EventPropertyEditor;
      case 'image':
        return ImagePropertyEditor;
      default:
        return StringPropertyEditor;
    }
  }
}

export default PropertyEditor;