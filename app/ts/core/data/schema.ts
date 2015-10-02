export enum SchemaFieldType {
  STRING,
  NUMBER,
  DATE,
  BINARY
}

export class SchemaField {
  name: string;
  type: SchemaFieldType;

  constructor(name: string, type: SchemaFieldType) {
    this.name = name;
    this.type = type;
  }
}

export class Schema {
  fields: SchemaField[];

  constructor(fields: SchemaField[] = []) {
    this.fields = fields;
  }

  static serialize(schema: Schema): string {
    return JSON.stringify(schema.fields);
  }

  static deserialize(json: string): Schema {
    return new Schema(
      JSON.parse(json).map((jsonField) => {
        return new SchemaField(jsonField.name, +jsonField.type);
      })
    );
  }
}
