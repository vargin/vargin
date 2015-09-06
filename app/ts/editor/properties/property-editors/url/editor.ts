/// <reference path="../../../../../../typings/tsd.d.ts" />
import { bind, Component, Inject, Injector, View } from 'angular2/angular2';

import { IProperty, Property } from 'core/property';
import { DialogService } from 'services/dialog-service';
import { URLPropertyEditorDialog } from 'editor/properties/property-editors/url/editor-dialog';
import { ApplicationService } from 'services/application-service';

@Component({
  selector: 'url-property-editor',
  properties: ['property']
})
@View({
  template: `
    <label class="vargin-property-editor">
      <span class="vargin-property-editor__label">{{property.getName()}}</span>
      <div class="vargin-property-editor__input url-editor__input">
        <span class="url-editor__input-value" [title]="getURL()">
          {{getURL()}}
        </span>
        <button type="button" (click)="changeURL()">...</button>
      </div>
    </label>`
})
class URLPropertyEditor {
  private property: IProperty<string>;

  constructor(@Inject(Property) property: IProperty<string>) {
    this.property = property;
  }

  getURL() {
    let urlString = this.property.getValue();

    if (!urlString) {
      return '[Not defined]';
    }

    if (urlString.startsWith('page:')) {
      let pageId = urlString.split(':')[1];
      let page = ApplicationService.current.pages.find(
        (page) => page.id === pageId
      );

      if (page) {
        return page.name;
      } else {
        this.property.setValue('');
        return '[Not defined]';
      }
    }

    return urlString;
  }

  changeURL() {
    DialogService.show({
      component: URLPropertyEditorDialog,
      bindings: Injector.resolve([bind(Property).toValue(this.property)])
    });
  }
}

export default URLPropertyEditor;
