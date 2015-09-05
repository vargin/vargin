import { Application } from 'core/application';
import { UtilsService } from 'services/utils-service';

export class Workspace {
  private _id: string;
  private _name: string;
  private _application: Application;

  constructor(id: string, name: string, application: Application) {
    this._id = id;
    this._name = name;
    this._application = application;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get application() {
    return this._application;
  }
}

export class WorkspaceService {
  static create(application: Application): Promise<Workspace> {
    return Promise.resolve(
      new Workspace(UtilsService.uuid(), '(Default)', application)
    );
  }
}
