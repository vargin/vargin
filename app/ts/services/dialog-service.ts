/// <reference path="../../../typings/tsd.d.ts" />
import { EventEmitter, ResolvedBinding, Type } from 'angular2/angular2';

export interface IDialogRequest {
  component: Type;
  bindings: ResolvedBinding[];
}

export class DialogService {
  static onRequest: EventEmitter = new EventEmitter();

  static show(dialogRequest: IDialogRequest) {
    DialogService.onRequest.next(dialogRequest);
  }
}

export default DialogService;
