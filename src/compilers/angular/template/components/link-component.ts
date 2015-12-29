import {
  ChangeDetectorRef,
  Component,
  DynamicComponentLoader,
  Inject,
  IterableDiffers,
  View,
  ViewContainerRef
} from 'angular2/core';

import { Router } from 'angular2/router';

import { ApplicationService } from '../services/application-service';
import { Control } from '../../../../core/controls/control';
import { BaseComponent } from './base-component';
import { Address, AddressType } from '../../../../core/data/address';

@Component({
  selector: 'a[vargin-type=link]',
  properties: ['control'],
  host: {
    '(click)': 'onClick($event)',
    'href': 'javascript:void(0)',
    '[class]': 'cssClass',
    '[title]': 'control?.getProperty("title").getValue()',
    '[target]': 'control?.getProperty("target").getValue()',
    '[href]': 'href'
  }
})
@View({
  template: '{{ control?.getProperty("text").getValue() }}'
})
export class LinkComponent extends BaseComponent {
  private href: string;
  private address: Address;
  private router: Router;

  constructor(
    @Inject(Router) router: Router,
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

    this.router = router;
  }

  ngDoCheck() {
    super.ngDoCheck();

    let addressString = this.control.getProperty('address').getValue();
    if (!this.address || addressString !== Address.serialize(this.address)) {
      this.address = addressString ?
        Address.deserialize(addressString) : new Address();
      this.href = this.address.type !== AddressType.APP_PAGE ?
        this.address.value : 'javascript:void(0)';
    }
  }

  onClick() {
    if (this.address.type === AddressType.APP_PAGE) {
      this.router.navigate(['Page', { id: this.address.value }]);
    }
  }
}
