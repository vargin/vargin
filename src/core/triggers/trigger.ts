import { parse, IConditionAST, IConditionLeaf } from 'vargin/condition-parser';

import { IAction } from '../actions/action';

interface BinderType { (type: string, value: any): string; }

export class Trigger {
  name: string;
  actions: IAction[];
  private _rawCondition: string;
  private _parsedCondition: IConditionAST[];

  constructor(
    name: string, rawCondition: string = '', actions: IAction[] = []
  ) {
    this.name = name;
    this.actions = actions;

    this._rawCondition = rawCondition;
    this._parsedCondition = [];
  }

  get condition() {
    return this._rawCondition;
  }

  set condition(value: string) {
    if (value !== this._rawCondition) {
      this._rawCondition = value;
      this._parsedCondition = [];
    }
  }

  isApplicable(binder?: BinderType): boolean {
    if (this._parsedCondition.length === 0) {
      try {
        this._parsedCondition = <IConditionAST[]>parse(this._rawCondition);
      } catch (e) {
        console.log('Invalid condition: %s', this.condition);
        return false;
      }
    }

    let conditionResult = false;
    for (let parsedCondition of this._parsedCondition) {
      let currentConditionResult = this.checkCondition(parsedCondition, binder);

      if (parsedCondition.anchor) {
        if (parsedCondition.anchor.value === '&&') {
          conditionResult = conditionResult && currentConditionResult;
        } else if (parsedCondition.anchor.value === '||') {
          conditionResult = conditionResult || currentConditionResult;
        }
      }

      conditionResult = currentConditionResult;
    }

    return conditionResult;
  }

  private checkCondition(parsedCondition: IConditionAST, binder?: BinderType) {
    try {
      let leftValue = this.getValue<any>(parsedCondition.left, binder);
      let rightValue = this.getValue<any>(parsedCondition.right, binder);

      return leftValue === rightValue;
    } catch (e) {
      console.log('Values can not be parsed: ', e);

      return false;
    }
  }

  private getValue<TValue>(
    conditionLeaf: IConditionLeaf<TValue>,
    binder?: BinderType
  ): any {
    if (conditionLeaf.type === 'control-binding' ||
        conditionLeaf.type === 'data-binding' ||
        conditionLeaf.type === 'foreign-control-binding') {
      if (!binder) {
        throw new Error('Not supported');
      }

      return binder(conditionLeaf.type, conditionLeaf.value);
    } else if (conditionLeaf.type === 'boolean') {
      return Boolean(conditionLeaf.value);
    } else if (conditionLeaf.type === 'number') {
      return +conditionLeaf.value;
    }

    return conditionLeaf.value.toString();
  }
}
