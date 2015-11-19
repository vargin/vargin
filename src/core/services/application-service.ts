import { Application } from '../application';

export class ApplicationService {
  static current: Application;

  static findControlById(controlId: string) {
    for (var page of ApplicationService.current.pages) {
      let control = page.root.find(controlId);
      if (control) {
        return control;
      }
    }

    return null;
  }
}
