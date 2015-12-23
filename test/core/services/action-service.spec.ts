import { it, describe, expect } from 'angular2/testing';
import { Overrides } from '../../../src/core/overrides/overrides';
import { AlertAction } from '../../../src/core/actions/alert-action';
import { BroadcastAction } from '../../../src/core/actions/broadcast-action';
import {
  ChangeOverridesAction
} from '../../../src/core/actions/change-overrides-action';
import {
  ChangePropertyAction
} from '../../../src/core/actions/change-property-action';
import { NavigateAction } from '../../../src/core/actions/navigate-action';
import { ActionService } from '../../../src/core/services/action-service';

describe('core/services/action-service', () => {
  function parsePropertyDescriptor(propertyDescriptor: string) {
    let propertyNameAndDefaultValue = propertyDescriptor.split(':');

    return {
      name: propertyNameAndDefaultValue[0],
      defaultValue: propertyNameAndDefaultValue[1] || ''
    };
  }

  const knownActionTypes = <[string, Function, string[]][]>[
    ['alert-action', AlertAction, ['alert-message']],
    [
      'broadcast-action',
      BroadcastAction,
      ['channel', 'message-name', 'message-data']
    ],
    [
      'change-overrides-action',
      ChangeOverridesAction,
      ['control-id', 'overrides-name']
    ],
    [
      'change-property-action',
      ChangePropertyAction,
      ['control-id', 'property-name', 'property-value']
    ],
    ['navigate-action', NavigateAction, ['address', 'target:_self']]
  ];

  it('createByType(unknown-type)', function() {
    expect(() => ActionService.createByType('unknown-type')).toThrowErrorWith(
      'Not supported action type: unknown-type'
    );
  });

  it('createByType(known-type)', function() {
    knownActionTypes.forEach(([typeName, Type, propertyDescriptors]) => {
      let properties = propertyDescriptors.map(
        (propertyDescriptor) => parsePropertyDescriptor(propertyDescriptor)
      );

      let action = ActionService.createByType(typeName);

      expect(action).toBeAnInstanceOf(Type);
      expect(action.meta.type).toEqual(typeName);

      properties.forEach((property) => {
        expect(action.getProperty(property.name).getValue()).toEqual(
          property.defaultValue
        );
      });

      let propertyValues = <[string, string][]>properties.map(
        (property) => [property.name, `${property.name}-value`]
      );

      action = ActionService.createByType(
        typeName,
        new Overrides('action',
          new Map(<[string, Map<string, string>][]>[
            ['properties', new Map(propertyValues)]
          ])
        )
      );

      expect(action).toBeAnInstanceOf(Type);
      expect(action.meta.type).toEqual(typeName);

      propertyValues.forEach(([propertyName, propertyValue]) => {
        expect(action.getProperty(propertyName).getValue()).toEqual(
          propertyValue
        );
      });
    });
  });

  it('clone(known-type)', function() {
    knownActionTypes.map(([typeName, Type, propertyDescriptors]) => {
      let properties = propertyDescriptors.map(
        (propertyDescriptor) => parsePropertyDescriptor(propertyDescriptor)
      );

      let propertyValues = <[string, string][]>properties.map(
        (property) => [property.name, `${property.name}-value`]
      );

      let actionToClone = ActionService.createByType(
        typeName,
        new Overrides('action',
          new Map(<[string, Map<string, string>][]>[
            ['properties', new Map(propertyValues)]
          ])
        )
      );

      let clonedAction = ActionService.clone(actionToClone);

      expect(actionToClone).toBeAnInstanceOf(Type);
      expect(actionToClone.meta.type).toEqual(typeName);
      expect(clonedAction).toBeAnInstanceOf(Type);
      expect(clonedAction.meta.type).toEqual(typeName);

      expect(actionToClone === clonedAction).toEqual(false);

      propertyValues.forEach(([propertyName, propertyValue]) => {
        expect(clonedAction.getProperty(propertyName).getValue()).toEqual(
          propertyValue
        );
      });

      // Change original values.
      properties.forEach((property) => {
        actionToClone.getProperty(property.name).setValue(
          `${property.name}-original`
        );
      });

      propertyValues.forEach(([propertyName, propertyValue]) => {
        expect(actionToClone.getProperty(propertyName).getValue()).toEqual(
          `${propertyName}-original`
        );

        expect(clonedAction.getProperty(propertyName).getValue()).toEqual(
          propertyValue
        );
      });

      // Change cloned values.
      properties.forEach((property) => {
        clonedAction.getProperty(property.name).setValue(
          `${property.name}-cloned`
        );
      });

      propertyValues.forEach(([propertyName, propertyValue]) => {
        expect(actionToClone.getProperty(propertyName).getValue()).toEqual(
          `${propertyName}-original`
        );

        expect(clonedAction.getProperty(propertyName).getValue()).toEqual(
          `${propertyName}-cloned`
        );
      });
    });
  });
});
