import {
  ChangeDetectorRef,
  Component,
  DynamicComponentLoader,
  Inject,
  IterableDiffers,
  OnDestroy,
  View,
  ViewContainerRef
} from 'angular2/core';
import { Control } from '../../../../core/controls/control';
import {
  ListControl,
  ListItemControl
} from '../../../../core/controls/visual/list-control';
import { BaseComponent } from './base-component';
import {
  ApplicationService,
  ApplicationDatasource
} from '../services/application-service';

@Component({
  selector: 'div[vargin-type=list]',
  properties: ['control'],
  inputs: ['control'],
  host: {
    '[class]': 'cssClass'
  }
})
@View({
  template: `<div class="vargin-dynamic-anchor" #container hidden></div>`
})
export class ListComponent extends BaseComponent implements OnDestroy {
  control: ListControl;
  private datasource: ApplicationDatasource;

  private template: ListItemControl;

  constructor(
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Inject(IterableDiffers) iterableDiffers: IterableDiffers,
    @Inject(ChangeDetectorRef) changeDetector: ChangeDetectorRef,
    @Inject(DynamicComponentLoader) loader: DynamicComponentLoader,
    @Inject(ApplicationService) applicationService: ApplicationService,
    @Inject(Control) control: Control
  ) {
    super(
      viewContainer,
      iterableDiffers,
      changeDetector,
      loader,
      applicationService,
      control
    );

    this.template = this.control.getTemplate();
    this.control.removeChild(this.template);

    this.datasource = this.applicationService.datasources.get(
      this.control.getProperty('datasource').getValue()
    );

    this.bind();
  }

  ngOnDestroy() {
    this.control.getChildren().forEach(
      (clone) => this.applicationService.destroyClone(clone)
    );

    this.control.setTemplate(this.template);
  }

  private bind() {
    this.datasource.items.forEach((item) => {
      this.control.addChild(
        this.bindControl(
          this.applicationService.cloneControl(this.template), item
        )
      );
    });
  }

  private bindControl(control: Control, item: Map<string, string>) {
    control.meta.properties.forEach((property, propertyKey) => {
      let rawProperty = control.getProperty(propertyKey);
      let rawValue = rawProperty.getValue();

      if (rawValue.startsWith('bind:')) {
        rawProperty.setValue(item.get(rawValue.split(':')[1]));
      }
    });

    control.getChildren().forEach((child) => this.bindControl(child, item));

    return control;
  }
}
