import { it, describe, expect } from 'angular2/testing';
import { Overrides } from '../../../src/core/overrides/overrides';

describe('core/overrides/overrides', () => {
  it('constructor(name)', function () {
    let overrides = new Overrides('test-overrides');

    expect(overrides.name).toEqual('test-overrides');
    expect(overrides.isEditorVisible).toEqual(true);
    expect(overrides.isEnabled).toEqual(true);
    expect(overrides.groups.size).toEqual(0);
    expect(overrides.children.length).toEqual(0);
    expect(overrides.parent).toBeNull();
  });

  it('constructor(name, groups)', function () {
    let overrides = new Overrides('test-overrides',
      new Map(<[string, Map<string, string>][]>[
        ['group#1', new Map(<[string, string][]>[
          ['group#1#prop#1', 'group#1prop#1#value']
        ])],
        ['group#2', new Map(<[string, string][]>[
          ['group#2#prop#1', 'group#2prop#1#value'],
          ['group#2#prop#2', 'group#2prop#2#value'],
        ])]
      ])
    );

    expect(overrides.name).toEqual('test-overrides');
    expect(overrides.isEditorVisible).toEqual(true);
    expect(overrides.isEnabled).toEqual(true);
    expect(overrides.groups.size).toEqual(2);
    expect(overrides.children.length).toEqual(0);
    expect(overrides.parent).toBeNull();

    expect(overrides.groups.get('group#1').size).toEqual(1);
    expect(overrides.groups.get('group#1').get('group#1#prop#1')).toEqual(
      'group#1prop#1#value'
    );
    expect(overrides.groups.get('group#2').size).toEqual(2);
    expect(overrides.groups.get('group#2').get('group#2#prop#1')).toEqual(
      'group#2prop#1#value'
    );
    expect(overrides.groups.get('group#2').get('group#2#prop#2')).toEqual(
      'group#2prop#2#value'
    );
  });

  it('constructor(name, groups, isEnabled)', function () {
    let overrides = new Overrides('test-overrides',
      new Map(<[string, Map<string, string>][]>[
        ['group#1', new Map(<[string, string][]>[
          ['group#1#prop#1', 'group#1prop#1#value']
        ])]
      ]),
      true
    );

    expect(overrides.name).toEqual('test-overrides');
    expect(overrides.isEditorVisible).toEqual(true);
    expect(overrides.isEnabled).toEqual(true);
    expect(overrides.groups.size).toEqual(1);
    expect(overrides.children.length).toEqual(0);
    expect(overrides.parent).toBeNull();

    expect(overrides.groups.get('group#1').size).toEqual(1);
    expect(overrides.groups.get('group#1').get('group#1#prop#1')).toEqual(
      'group#1prop#1#value'
    );

    overrides = new Overrides('test-overrides',
      new Map(<[string, Map<string, string>][]>[
        ['group#1', new Map(<[string, string][]>[
          ['group#1#prop#1', 'group#1prop#1#value']
        ])]
      ]),
      false
    );

    expect(overrides.name).toEqual('test-overrides');
    expect(overrides.isEditorVisible).toEqual(true);
    expect(overrides.isEnabled).toEqual(false);
    expect(overrides.groups.size).toEqual(1);
    expect(overrides.children.length).toEqual(0);
    expect(overrides.parent).toBeNull();

    expect(overrides.groups.get('group#1').size).toEqual(1);
    expect(overrides.groups.get('group#1').get('group#1#prop#1')).toEqual(
      'group#1prop#1#value'
    );
  });

  it('constructor(name, groups, isEnabled, isEditorVisible)', function () {
    let overrides = new Overrides('test-overrides',
      new Map(<[string, Map<string, string>][]>[
        ['group#1', new Map(<[string, string][]>[
          ['group#1#prop#1', 'group#1prop#1#value']
        ])]
      ]),
      true,
      true
    );

    expect(overrides.name).toEqual('test-overrides');
    expect(overrides.isEditorVisible).toEqual(true);
    expect(overrides.isEnabled).toEqual(true);
    expect(overrides.groups.size).toEqual(1);
    expect(overrides.children.length).toEqual(0);
    expect(overrides.parent).toBeNull();

    expect(overrides.groups.get('group#1').size).toEqual(1);
    expect(overrides.groups.get('group#1').get('group#1#prop#1')).toEqual(
      'group#1prop#1#value'
    );

    overrides = new Overrides('test-overrides',
      new Map(<[string, Map<string, string>][]>[
        ['group#1', new Map(<[string, string][]>[
          ['group#1#prop#1', 'group#1prop#1#value']
        ])]
      ]),
      true,
      false
    );

    expect(overrides.name).toEqual('test-overrides');
    expect(overrides.isEditorVisible).toEqual(false);
    expect(overrides.isEnabled).toEqual(true);
    expect(overrides.groups.size).toEqual(1);
    expect(overrides.children.length).toEqual(0);
    expect(overrides.parent).toBeNull();

    expect(overrides.groups.get('group#1').size).toEqual(1);
    expect(overrides.groups.get('group#1').get('group#1#prop#1')).toEqual(
      'group#1prop#1#value'
    );
  });

  it('getValue()', function () {
    let overrides = new Overrides('test-overrides',
      new Map(<[string, Map<string, string>][]>[
        ['group#1', new Map(<[string, string][]>[
          ['group#1#prop#1', 'group#1prop#1#value']
        ])],
        ['group#2', new Map(<[string, string][]>[
          ['group#2#prop#1', 'group#2prop#1#value'],
          ['group#2#prop#2', 'group#2prop#2#value'],
        ])]
      ])
    );

    expect(overrides.getValue('group#1', 'group#1#prop#1')).toEqual(
      'group#1prop#1#value'
    );
    expect(overrides.getValue('group#2', 'group#2#prop#1')).toEqual(
      'group#2prop#1#value'
    );
    expect(overrides.getValue('group#2', 'group#2#prop#2')).toEqual(
      'group#2prop#2#value'
    );
  });

  it('getValue() on child', function () {
    let overrides = new Overrides('test-overrides',
      new Map(<[string, Map<string, string>][]>[
        ['group#1', new Map(<[string, string][]>[
          ['group#1#prop#1', 'group#1prop#1#value']
        ])],
        ['group#2', new Map(<[string, string][]>[
          ['group#2#prop#1', 'group#2prop#1#value'],
          ['group#2#prop#2', 'group#2prop#2#value'],
        ])]
      ])
    );

    let childOverrides1 = new Overrides('child-overrides',
      new Map(<[string, Map<string, string>][]>[
        ['group#2', new Map(<[string, string][]>[
          ['group#2#prop#1', 'child-group#2prop#1#value'],
          ['group#2#prop#2', 'child-group#2prop#2#value'],
        ])],
        ['group#3', new Map(<[string, string][]>[
          ['group#3#prop#1', 'child-group#3prop#1#value']
        ])]
      ])
    );

    let childOverrides2 = new Overrides('child-overrides',
      new Map(<[string, Map<string, string>][]>[
        ['group#2', new Map(<[string, string][]>[
          ['group#2#prop#3', 'child-group#2prop#3#value']
        ])]
      ])
    );

    childOverrides1.add(childOverrides2);
    overrides.add(childOverrides1);

    // Parent
    expect(overrides.getValue('group#1', 'group#1#prop#1')).toEqual(
      'group#1prop#1#value'
    );
    expect(overrides.getValue('group#2', 'group#2#prop#1')).toEqual(
      'group#2prop#1#value'
    );
    expect(overrides.getValue('group#2', 'group#2#prop#2')).toEqual(
      'group#2prop#2#value'
    );
    expect(overrides.getValue('group#2', 'group#2#prop#3')).toBeUndefined();
    expect(overrides.getValue('group#3', 'group#3#prop#1')).toBeUndefined();


    // Child #1
    expect(childOverrides1.getValue('group#1', 'group#1#prop#1')).toEqual(
      'group#1prop#1#value'
    );
    expect(childOverrides1.getValue('group#2', 'group#2#prop#1')).toEqual(
      'child-group#2prop#1#value'
    );
    expect(childOverrides1.getValue('group#2', 'group#2#prop#2')).toEqual(
      'child-group#2prop#2#value'
    );
    expect(
      childOverrides1.getValue('group#2', 'group#2#prop#3')
    ).toBeUndefined();
    expect(childOverrides1.getValue('group#3', 'group#3#prop#1')).toEqual(
      'child-group#3prop#1#value'
    );

    // Child #2
    expect(childOverrides2.getValue('group#1', 'group#1#prop#1')).toEqual(
      'group#1prop#1#value'
    );
    expect(childOverrides2.getValue('group#2', 'group#2#prop#1')).toEqual(
      'child-group#2prop#1#value'
    );
    expect(childOverrides2.getValue('group#2', 'group#2#prop#2')).toEqual(
      'child-group#2prop#2#value'
    );
    expect(childOverrides2.getValue('group#2', 'group#2#prop#3')).toEqual(
      'child-group#2prop#3#value'
    );
    expect(childOverrides2.getValue('group#3', 'group#3#prop#1')).toEqual(
      'child-group#3prop#1#value'
    );
  });

  it('setValue()', function () {
    let overrides = new Overrides('test-overrides',
      new Map(<[string, Map<string, string>][]>[
        ['group#1', new Map(<[string, string][]>[
          ['group#1#prop#1', 'group#1prop#1#value']
        ])],
        ['group#2', new Map(<[string, string][]>[
          ['group#2#prop#1', 'group#2prop#1#value'],
          ['group#2#prop#2', 'group#2prop#2#value'],
        ])]
      ])
    );

    // Existing group and property.
    overrides.setValue(
      'group#1', 'group#1#prop#1', 'group#1prop#1#value-changed'
    );

    // Existing group, but new property.
    overrides.setValue('group#2', 'group#2#prop#3', 'group#2prop#3#value');

    // New group and property.
    overrides.setValue('group#3', 'group#3#prop#1', 'group#3prop#1#value');

    expect(overrides.getValue('group#1', 'group#1#prop#1')).toEqual(
      'group#1prop#1#value-changed'
    );

    expect(overrides.getValue('group#2', 'group#2#prop#1')).toEqual(
      'group#2prop#1#value'
    );
    expect(overrides.getValue('group#2', 'group#2#prop#2')).toEqual(
      'group#2prop#2#value'
    );
    expect(overrides.getValue('group#2', 'group#2#prop#3')).toEqual(
      'group#2prop#3#value'
    );

    expect(overrides.getValue('group#3', 'group#3#prop#1')).toEqual(
      'group#3prop#1#value'
    );
  });

  it('setValue() on child', function () {
    let overrides = new Overrides('test-overrides',
      new Map(<[string, Map<string, string>][]>[
        ['group#1', new Map(<[string, string][]>[
          ['group#1#prop#1', 'group#1prop#1#value']
        ])]
      ])
    );

    let childOverrides1 = new Overrides('child-overrides',
      new Map(<[string, Map<string, string>][]>[
        ['group#2', new Map(<[string, string][]>[
          ['group#2#prop#1', 'group#2prop#1#value']
        ])]
      ])
    );

    let childOverrides2 = new Overrides('child-overrides',
      new Map(<[string, Map<string, string>][]>[
        ['group#3', new Map(<[string, string][]>[
          ['group#3#prop#1', 'group#3prop#1#value']
        ])]
      ])
    );

    childOverrides1.add(childOverrides2);
    overrides.add(childOverrides1);

    // Update root value.
    overrides.setValue(
      'group#1', 'group#1#prop#1', 'group#1prop#1#value-changed'
    );

    expect(overrides.getValue('group#1', 'group#1#prop#1')).toEqual(
      'group#1prop#1#value-changed'
    );
    expect(childOverrides1.getValue('group#1', 'group#1#prop#1')).toEqual(
      'group#1prop#1#value-changed'
    );
    expect(childOverrides1.getValue('group#2', 'group#2#prop#1')).toEqual(
      'group#2prop#1#value'
    );
    expect(childOverrides2.getValue('group#1', 'group#1#prop#1')).toEqual(
      'group#1prop#1#value-changed'
    );
    expect(childOverrides2.getValue('group#3', 'group#3#prop#1')).toEqual(
      'group#3prop#1#value'
    );

    // Update child#1 value.
    childOverrides1.setValue(
      'group#1', 'group#1#prop#1', 'child#1group#1prop#1#value'
    );

    expect(overrides.getValue('group#1', 'group#1#prop#1')).toEqual(
      'group#1prop#1#value-changed'
    );
    expect(childOverrides1.getValue('group#1', 'group#1#prop#1')).toEqual(
      'child#1group#1prop#1#value'
    );
    expect(childOverrides1.getValue('group#2', 'group#2#prop#1')).toEqual(
      'group#2prop#1#value'
    );
    expect(childOverrides2.getValue('group#1', 'group#1#prop#1')).toEqual(
      'child#1group#1prop#1#value'
    );
    expect(childOverrides2.getValue('group#3', 'group#3#prop#1')).toEqual(
      'group#3prop#1#value'
    );

    // Update child#2 value.
    childOverrides2.setValue(
      'group#1', 'group#1#prop#1', 'child#2group#1prop#1#value'
    );

    expect(overrides.getValue('group#1', 'group#1#prop#1')).toEqual(
      'group#1prop#1#value-changed'
    );
    expect(childOverrides1.getValue('group#1', 'group#1#prop#1')).toEqual(
      'child#1group#1prop#1#value'
    );
    expect(childOverrides1.getValue('group#2', 'group#2#prop#1')).toEqual(
      'group#2prop#1#value'
    );
    expect(childOverrides2.getValue('group#1', 'group#1#prop#1')).toEqual(
      'child#2group#1prop#1#value'
    );
    expect(childOverrides2.getValue('group#3', 'group#3#prop#1')).toEqual(
      'group#3prop#1#value'
    );
  });

  it('add()', function () {
    let overrides = new Overrides('test-overrides');
    let childOverrides1 = new Overrides('child#1-overrides');
    let childOverrides2 = new Overrides('child#2-overrides');

    expect(overrides.parent).toBeNull();
    expect(overrides.children.length).toEqual(0);

    expect(childOverrides1.parent).toBeNull();
    expect(childOverrides1.children.length).toEqual(0);

    expect(childOverrides2.parent).toBeNull();
    expect(childOverrides2.children.length).toEqual(0);

    overrides.add(childOverrides1);

    expect(overrides.parent).toBeNull();
    expect(overrides.children.length).toEqual(1);
    expect(overrides.children[0]).toEqual(childOverrides1);

    expect(childOverrides1.parent).toEqual(overrides);
    expect(childOverrides1.children.length).toEqual(0);

    expect(childOverrides2.parent).toBeNull();
    expect(childOverrides2.children.length).toEqual(0);

    childOverrides1.add(childOverrides2);

    expect(overrides.parent).toBeNull();
    expect(overrides.children.length).toEqual(1);
    expect(overrides.children[0]).toEqual(childOverrides1);

    expect(childOverrides1.parent).toEqual(overrides);
    expect(childOverrides1.children.length).toEqual(1);
    expect(childOverrides1.children[0]).toEqual(childOverrides2);

    expect(childOverrides2.parent).toEqual(childOverrides1);
    expect(childOverrides2.children.length).toEqual(0);
  });

  it('remove()', function () {
    let overrides = new Overrides('test-overrides');
    let childOverrides1 = new Overrides('child#1-overrides');
    let childOverrides2 = new Overrides('child#2-overrides');
    let parentLessOverrides = new Overrides('child#3-overrides');

    overrides.add(childOverrides1);
    childOverrides1.add(childOverrides2);

    overrides.remove(parentLessOverrides);

    expect(overrides.children.length).toEqual(1);
    expect(overrides.children[0]).toEqual(childOverrides1);

    childOverrides1.remove(parentLessOverrides);

    expect(childOverrides1.children.length).toEqual(1);
    expect(childOverrides1.children[0]).toEqual(childOverrides2);

    childOverrides2.remove(parentLessOverrides);

    expect(childOverrides2.children.length).toEqual(0);

    childOverrides1.remove(childOverrides2);

    expect(childOverrides1.children.length).toEqual(0);
    expect(childOverrides2.parent).toBeNull();

    overrides.remove(childOverrides1);

    expect(overrides.children.length).toEqual(0);
    expect(childOverrides1.parent).toBeNull();
  });

  it('find()', function () {
    let overrides = new Overrides('test-overrides');
    let childOverrides1 = new Overrides('child#1-overrides');
    let childOverrides2 = new Overrides('child#2-overrides');
    let childOverrides22 = new Overrides('child#2-overrides-2');

    overrides.add(childOverrides1);
    childOverrides1.add(childOverrides2);
    childOverrides1.add(childOverrides22);

    expect(overrides.find('test-overrides')).toBeNull();
    expect(overrides.find('child#1-overrides')).toEqual(childOverrides1);
    expect(overrides.find('child#2-overrides')).toEqual(childOverrides2);
    expect(overrides.find('child#2-overrides-2')).toEqual(childOverrides22);

    expect(childOverrides1.find('test-overrides')).toBeNull();
    expect(childOverrides1.find('child#1-overrides')).toBeNull();
    expect(childOverrides1.find('child#2-overrides')).toEqual(childOverrides2);
    expect(childOverrides1.find('child#2-overrides-2')).toEqual(
      childOverrides22
    );

    expect(childOverrides2.find('test-overrides')).toBeNull();
    expect(childOverrides2.find('child#1-overrides')).toBeNull();
    expect(childOverrides2.find('child#2-overrides')).toBeNull();
    expect(childOverrides2.find('child#2-overrides-2')).toBeNull();
  });

  it('getRoot()', function () {
    let overrides = new Overrides('test-overrides');
    let childOverrides1 = new Overrides('child#1-overrides');
    let childOverrides2 = new Overrides('child#2-overrides');

    expect(overrides.getRoot()).toEqual(overrides);
    expect(childOverrides1.getRoot()).toEqual(childOverrides1);
    expect(childOverrides2.getRoot()).toEqual(childOverrides2);

    childOverrides1.add(childOverrides2);

    expect(overrides.getRoot()).toEqual(overrides);
    expect(childOverrides1.getRoot()).toEqual(childOverrides1);
    expect(childOverrides2.getRoot()).toEqual(childOverrides1);

    overrides.add(childOverrides1);

    expect(overrides.getRoot()).toEqual(overrides);
    expect(childOverrides1.getRoot()).toEqual(overrides);
    expect(childOverrides2.getRoot()).toEqual(overrides);
  });

  it('clone()', function() {
    let overrides = new Overrides('test-overrides',
      new Map(<[string, Map<string, string>][]>[
        ['group#1', new Map(<[string, string][]>[
          ['group#1#prop#1', 'group#1prop#1#value']
        ])]
      ]),
      false,
      false
    );

    let childOverrides1 = new Overrides('child#1-overrides',
      new Map(<[string, Map<string, string>][]>[
        ['group#2', new Map(<[string, string][]>[
          ['group#2#prop#1', 'group#2prop#1#value']
        ])]
      ]),
      false,
      true
    );

    let childOverrides2 = new Overrides('child#2-overrides',
      new Map(<[string, Map<string, string>][]>[
        ['group#3', new Map(<[string, string][]>[
          ['group#3#prop#1', 'group#3prop#1#value']
        ])]
      ]),
      true,
      false
    );

    let childOverrides22 = new Overrides('child#22-overrides',
      new Map(<[string, Map<string, string>][]>[
        ['group#32', new Map(<[string, string][]>[
          ['group#32#prop#1', 'group#32prop#1#value']
        ])]
      ])
    );

    overrides.add(childOverrides1);
    childOverrides1.add(childOverrides2);
    childOverrides1.add(childOverrides22);

    let clonedOverrides = overrides.clone();
    let clonedChildOverrides1 = clonedOverrides.children[0];
    let clonedChildOverrides2 = clonedChildOverrides1.children[0];
    let clonedChildOverrides22 = clonedChildOverrides1.children[1];

    [
      [overrides, clonedOverrides],
      [childOverrides1, clonedChildOverrides1],
      [childOverrides2, clonedChildOverrides2],
      [childOverrides22, clonedChildOverrides22]
    ].forEach(([source, clone]) => {
      expect(source === clone).toEqual(false);
      expect(source.groups === clone.groups).toEqual(false);
      expect(source.groups.size).toEqual(clone.groups.size);
      expect(source.name).toEqual(clone.name);
      expect(source.children.length).toEqual(clone.children.length);
      expect(source.isEnabled).toEqual(clone.isEnabled);
      expect(source.isEditorVisible).toEqual(clone.isEditorVisible);
    });

    expect(clonedOverrides.getValue('group#1', 'group#1#prop#1')).toEqual(
      'group#1prop#1#value'
    );
    expect(clonedChildOverrides1.getValue('group#2', 'group#2#prop#1')).toEqual(
      'group#2prop#1#value'
    );
    expect(clonedChildOverrides2.getValue('group#3', 'group#3#prop#1')).toEqual(
      'group#3prop#1#value'
    );
    expect(clonedChildOverrides22.getValue(
      'group#32', 'group#32#prop#1')
    ).toEqual(
      'group#32prop#1#value'
    );

    // Update source values
    overrides.setValue('group#1', 'group#1#prop#1', '1');
    childOverrides1.setValue('group#2', 'group#2#prop#1', '2');
    childOverrides2.setValue('group#3', 'group#3#prop#1', '3');
    childOverrides22.setValue('group#32', 'group#32#prop#1', '4');

    expect(overrides.getValue('group#1', 'group#1#prop#1')).toEqual('1');
    expect(childOverrides1.getValue('group#2', 'group#2#prop#1')).toEqual('2');
    expect(childOverrides2.getValue('group#3', 'group#3#prop#1')).toEqual('3');
    expect(childOverrides22.getValue('group#32', 'group#32#prop#1')).toEqual(
      '4'
    );

    expect(clonedOverrides.getValue('group#1', 'group#1#prop#1')).toEqual(
      'group#1prop#1#value'
    );
    expect(clonedChildOverrides1.getValue('group#2', 'group#2#prop#1')).toEqual(
      'group#2prop#1#value'
    );
    expect(clonedChildOverrides2.getValue('group#3', 'group#3#prop#1')).toEqual(
      'group#3prop#1#value'
    );
    expect(
      clonedChildOverrides22.getValue('group#32', 'group#32#prop#1')
    ).toEqual(
      'group#32prop#1#value'
    );

    // Update cloned values
    clonedOverrides.setValue('group#1', 'group#1#prop#1', '10');
    clonedChildOverrides1.setValue('group#2', 'group#2#prop#1', '20');
    clonedChildOverrides2.setValue('group#3', 'group#3#prop#1', '30');
    clonedChildOverrides22.setValue('group#32', 'group#32#prop#1', '40');

    expect(overrides.getValue('group#1', 'group#1#prop#1')).toEqual('1');
    expect(childOverrides1.getValue('group#2', 'group#2#prop#1')).toEqual('2');
    expect(childOverrides2.getValue('group#3', 'group#3#prop#1')).toEqual('3');
    expect(childOverrides22.getValue('group#32', 'group#32#prop#1')).toEqual(
      '4'
    );

    expect(clonedOverrides.getValue('group#1', 'group#1#prop#1')).toEqual('10');
    expect(clonedChildOverrides1.getValue('group#2', 'group#2#prop#1')).toEqual(
      '20'
    );
    expect(clonedChildOverrides2.getValue('group#3', 'group#3#prop#1')).toEqual(
      '30'
    );
    expect(
      clonedChildOverrides22.getValue('group#32', 'group#32#prop#1')
    ).toEqual(
      '40'
    );
  });
});
