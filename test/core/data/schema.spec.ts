import {
  Schema,
  SchemaField,
  SchemaFieldType
} from '../../../src/core/data/schema';

describe('core/data/schema', () => {
  describe('SchemaField', () => {
    it('constructor()', function () {
      let stringField = new SchemaField(
        'this is String', SchemaFieldType.STRING
      );

      let numberField = new SchemaField(
        'this is Number', SchemaFieldType.NUMBER
      );

      let dateField = new SchemaField(
        'this is Date', SchemaFieldType.DATE
      );

      let binaryField = new SchemaField(
        'this is Binary', SchemaFieldType.BINARY
      );

      let booleanField = new SchemaField(
        'this is Boolean', SchemaFieldType.BOOLEAN
      );

      expect(stringField.name).toEqual('this is String');
      expect(stringField.type).toEqual(SchemaFieldType.STRING);

      expect(numberField.name).toEqual('this is Number');
      expect(numberField.type).toEqual(SchemaFieldType.NUMBER);

      expect(dateField.name).toEqual('this is Date');
      expect(dateField.type).toEqual(SchemaFieldType.DATE);

      expect(binaryField.name).toEqual('this is Binary');
      expect(binaryField.type).toEqual(SchemaFieldType.BINARY);

      expect(booleanField.name).toEqual('this is Boolean');
      expect(booleanField.type).toEqual(SchemaFieldType.BOOLEAN);
    });
  });

  describe('Schema', () => {
    it('constructor()', function () {
      let emptySchema = new Schema();

      let schema = new Schema([
        new SchemaField('this is String', SchemaFieldType.STRING),
        new SchemaField('this is Number', SchemaFieldType.NUMBER),
        new SchemaField('this is Date', SchemaFieldType.DATE),
        new SchemaField('this is Binary', SchemaFieldType.BINARY),
        new SchemaField('this is Boolean', SchemaFieldType.BOOLEAN)
      ]);

      expect(emptySchema.fields.length).toEqual(0);

      expect(schema.fields.length).toEqual(5);

      expect(schema.fields[0].name).toEqual('this is String');
      expect(schema.fields[0].type).toEqual(SchemaFieldType.STRING);

      expect(schema.fields[1].name).toEqual('this is Number');
      expect(schema.fields[1].type).toEqual(SchemaFieldType.NUMBER);

      expect(schema.fields[2].name).toEqual('this is Date');
      expect(schema.fields[2].type).toEqual(SchemaFieldType.DATE);

      expect(schema.fields[3].name).toEqual('this is Binary');
      expect(schema.fields[3].type).toEqual(SchemaFieldType.BINARY);

      expect(schema.fields[4].name).toEqual('this is Boolean');
      expect(schema.fields[4].type).toEqual(SchemaFieldType.BOOLEAN);
    });

    it('serialize()', () => {
      let schema = new Schema([
        new SchemaField('this is String', SchemaFieldType.STRING),
        new SchemaField('this is Number', SchemaFieldType.NUMBER),
        new SchemaField('this is Date', SchemaFieldType.DATE),
        new SchemaField('this is Binary', SchemaFieldType.BINARY),
        new SchemaField('this is Boolean', SchemaFieldType.BOOLEAN)
      ]);

      expect(Schema.serialize(schema)).toEqual(
        JSON.stringify([
          { name: 'this is String', type: 0 },
          { name: 'this is Number', type: 1 },
          { name: 'this is Date', type: 2 },
          { name: 'this is Binary', type: 3 },
          { name: 'this is Boolean', type: 4 }
        ])
      );
    });

    it('deserialize()', () => {
      let serializedSchema = JSON.stringify([
        { name: 'this is String', type: 0 },
        { name: 'this is Number', type: 1 },
        { name: 'this is Date', type: 2 },
        { name: 'this is Binary', type: 3 },
        { name: 'this is Boolean', type: 4 }
      ]);

      let schema = Schema.deserialize(serializedSchema);

      expect(schema.fields.length).toEqual(5);

      expect(schema.fields[0].name).toEqual('this is String');
      expect(schema.fields[0].type).toEqual(SchemaFieldType.STRING);

      expect(schema.fields[1].name).toEqual('this is Number');
      expect(schema.fields[1].type).toEqual(SchemaFieldType.NUMBER);

      expect(schema.fields[2].name).toEqual('this is Date');
      expect(schema.fields[2].type).toEqual(SchemaFieldType.DATE);

      expect(schema.fields[3].name).toEqual('this is Binary');
      expect(schema.fields[3].type).toEqual(SchemaFieldType.BINARY);

      expect(schema.fields[4].name).toEqual('this is Boolean');
      expect(schema.fields[4].type).toEqual(SchemaFieldType.BOOLEAN);
    });
  });
});
