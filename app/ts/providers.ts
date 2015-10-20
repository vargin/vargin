import { ButtonControl } from 'core/controls/visual/button-control';
import { LabelControl } from 'core/controls/visual/label-control';
import { LinkControl } from 'core/controls/visual/link-control';
import { ListControl } from 'core/controls/visual/list-control';
import { RangeControl } from 'core/controls/visual/range-control';
import { TextInputControl } from 'core/controls/visual/text-input-control';
import { DatasourceControl } from 'core/controls/service/datasource-control';

export const VISUAL_CONTROLS = [
  ButtonControl,
  LabelControl,
  LinkControl,
  ListControl,
  RangeControl,
  TextInputControl
];

export const SERVICE_CONTROLS = [
  DatasourceControl
];

import { ButtonComponent } from 'editor/control-components/visual/button-component';
import { LabelComponent } from 'editor/control-components/visual/label-component';
import { LinkComponent } from 'editor/control-components/visual/link-component';
import { ListComponent } from 'editor/control-components/visual/list-component';
import { RangeComponent } from 'editor/control-components/visual/range-component';
import { TextInputComponent } from 'editor/control-components/visual/text-input-component';
import { DatasourceComponent } from 'editor/control-components/service/datasource-component';

export const VISUAL_COMPONENTS = [
  ButtonComponent,
  LabelComponent,
  LinkComponent,
  ListComponent,
  RangeComponent,
  TextInputComponent
];

export const SERVICE_COMPONENTS = [
  DatasourceComponent
];

import { ActionEditor } from 'editor/properties/action-editor';

export const EDITORS_COMPONENTS = [
  ActionEditor
];



