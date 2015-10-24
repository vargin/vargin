import { ButtonComponent } from 'editor/control-components/visual/button-component';
import { LabelComponent } from 'editor/control-components/visual/label-component';
import { LinkComponent } from 'editor/control-components/visual/link-component';
import { ListComponent } from 'editor/control-components/visual/list-component';
import { RangeComponent } from 'editor/control-components/visual/range-component';
import { TextInputComponent } from 'editor/control-components/visual/text-input-component';
import { DatasourceComponent } from 'editor/control-components/service/datasource-component';

import { ActionEditor } from 'editor/properties/action-editor';

export const REGISTRY = [
  ButtonComponent,
  LabelComponent,
  LinkComponent,
  ListComponent,
  RangeComponent,
  TextInputComponent,

  DatasourceComponent,
  ActionEditor
];



