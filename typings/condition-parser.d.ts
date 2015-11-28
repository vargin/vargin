declare module 'vargin/condition-parser' {

  export interface IForeignControlLeafValue {
    control: string;
    property: string;
  }

  export interface IConditionLeaf<TValue> {
    type: string;
    value: TValue;
  }

  export interface IConditionAST {
    left: IConditionLeaf<string> | IConditionLeaf<IForeignControlLeafValue>;
    right: IConditionLeaf<string> | IConditionLeaf<IForeignControlLeafValue>;
    operator: IConditionLeaf<string>;
    anchor?: IConditionLeaf<string>;
  }

  export function parse(expression: string): IConditionAST[];
}
