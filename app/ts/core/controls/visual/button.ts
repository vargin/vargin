/// <reference path="../../../../../typings/tsd.d.ts" />
import BaseControl from 'core/controls/base';

class ButtonControl extends BaseControl {
  public text: string = '[Text]';
  public title: string = '[Title]';

  constructor() {
    super('button', 'Button', 'HTML Button', 'visual');
  }
}

export default ButtonControl;