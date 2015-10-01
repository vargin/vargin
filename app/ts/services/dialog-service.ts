/// <reference path="../../../typings/tsd.d.ts" />
import { EventEmitter, ResolvedBinding, Type } from 'angular2/angular2';
import { Deferred, UtilsService } from 'services/utils-service';

export interface IDialogRequest {
  uuid: string;
  component: Type;
  bindings: ResolvedBinding[];
}

export class DialogService {
  static onRequest: EventEmitter = new EventEmitter();
  private static dialogs: Map<string, Deferred<void>> = new Map();

  static show(component: Type, bindings: ResolvedBinding[]): Promise<void> {
    let dialogRequest = {
      uuid: UtilsService.uuid(),
      component: component,
      bindings: bindings
    };

    let dialogDeferred = new Deferred<void>();
    this.dialogs.set(dialogRequest.uuid, dialogDeferred);

    DialogService.onRequest.next(dialogRequest);

    return dialogDeferred.promise;
  }

  static hide(uuid: string) {
    let dialogDeferred = this.dialogs.get(uuid);

    if (dialogDeferred) {
      dialogDeferred.resolve();
      this.dialogs.delete(uuid);
    }
  }
}

export default DialogService;
