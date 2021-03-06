import { EventEmitter, Provider, Type } from 'angular2/core';
import { Deferred, UtilsService } from '../../../core/services/utils-service';

export interface IDialogRequest {
  uuid: string;
  component: Type;
  providers: Provider[];
}

export class DialogService {
  static onRequest: EventEmitter<IDialogRequest> =
    new EventEmitter<IDialogRequest>();
  private static dialogs: Map<string, Deferred<void>> =
    new Map<string, Deferred<void>>();

  static show(component: Type, providers: Provider[] = []): Promise<any> {
    let dialogRequest = {
      uuid: UtilsService.uuid(),
      component: component,
      providers: providers
    };

    let dialogDeferred = new Deferred<void>();
    this.dialogs.set(dialogRequest.uuid, dialogDeferred);

    DialogService.onRequest.next(dialogRequest);

    return dialogDeferred.promise;
  }

  static hide(uuid: string, value?) {
    let dialogDeferred = this.dialogs.get(uuid);

    if (dialogDeferred) {
      dialogDeferred.resolve(value);
      this.dialogs.delete(uuid);
    }
  }
}

export default DialogService;
