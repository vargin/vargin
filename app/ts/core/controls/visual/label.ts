/// <reference path="../../../../../typings/tsd.d.ts" />
import BaseControl from 'core/controls/base';

class LabelControl extends BaseControl {
  public text: string;

  constructor(text: string = '[Text]') {
    super('label', 'Label', 'HTML Label', 'visual');

    this.text = text;
  }
}

export default LabelControl;