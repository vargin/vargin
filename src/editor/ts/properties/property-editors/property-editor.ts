/// <reference path="../../../../../typings/tsd.d.ts" />
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

import { IProperty, Property } from 'core/property';

import ColorPropertyEditor from 'editor/ts/properties/property-editors/color-property-editor';
import NumberPropertyEditor from 'editor/ts/properties/property-editors/number-property-editor';
import StringPropertyEditor from 'editor/ts/properties/property-editors/string-property-editor';
import PropertyWithOptionsEditor from 'editor/ts/properties/property-editors/property-with-options-editor';
import EventPropertyEditor from 'editor/ts/properties/property-editors/event-property-editor';
import ImagePropertyEditor from 'editor/ts/properties/property-editors/image-property-editor';
import URLPropertyEditor from 'editor/ts/properties/property-editors/url/editor';
import { SchemaPropertyEditor } from 'editor/ts/properties/property-editors/schema/editor';
import { ItemsPropertyEditor } from 'editor/ts/properties/property-editors/items/editor';
import DatasourcePropertyEditor from 'editor/ts/properties/property-editors/datasource-property-editor';

@Component({
  selector: 'property-editor',
  properties: ['property']
})
@View({
  template: `<div #container hidden></div>`
})
class PropertyEditor implements OnChanges {
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

    setTimeout(() => {
      this.loader.loadIntoLocation(
        PropertyEditor.getEditorType(this.property),
        this.viewContainer.element,
        'container',
        Injector.resolve([provide(Property, { useValue: this.property })])
      );
    });
  }

  static getEditorType(property: IProperty<any>): Type {
    let propertyType = 'getOptions' in property ?
      'options' : property.getType();
    switch (propertyType) {
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
        return <Type>EventPropertyEditor;
      case 'image':
        return ImagePropertyEditor;
      case 'url':
        return URLPropertyEditor;
      case 'schema':
        return SchemaPropertyEditor;
      case 'items':
        return ItemsPropertyEditor;
      case 'datasource':
        return DatasourcePropertyEditor;
      default:
        return StringPropertyEditor;
    }
  }
}

export default PropertyEditor;
