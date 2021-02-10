import {
  DictionaryCategory,
  Dictionary,
  ErrorListener,
  ErrorCode,
  Expression,
  Form,
} from './public';
import { getDefaultDictionary } from './dictionary/dictionary';
import { form } from './forms';

export class ComputeEngine {
  static getDictionary(domain: DictionaryCategory | 'all' = 'all'): Dictionary {
    return getDefaultDictionary(domain);
  }
  private dictionary: Dictionary;
  private _scope: Dictionary;
  private onError?: ErrorListener<ErrorCode>;

  constructor(options?: {
    dictionary?: Dictionary;
    onError?: ErrorListener<ErrorCode>;
  }) {
    const onError = (err) => {
      if (typeof window !== 'undefined') {
        if (!err.before || !err.after) {
          console.warn(err.code + (err.arg ? ': ' + err.arg : ''));
        } else {
          console.warn(
            err.code +
              (err.arg ? ': ' + err.arg : '') +
              '\n' +
              '%c' +
              '|  ' +
              err.before +
              '%c' +
              err.after +
              '\n' +
              '%c' +
              '|  ' +
              String(' ').repeat(err.before.length) +
              '▲',
            'font-weight: bold',
            'font-weight: normal; color: rgba(160, 160, 160)',
            'font-weight: bold; color: hsl(4deg, 90%, 50%)'
          );
        }
      }
      return;
    };
    this.onError = options?.onError ?? onError;
    this.dictionary = options?.dictionary ?? ComputeEngine.getDictionary();
  }
  get scope(): Dictionary {
    return this._scope;
  }
  format(expr: Expression | null, forms: Form[]): Expression | null {
    return form(expr, forms, { dictionary: this.dictionary });
  }
  evaluate(exp: Readonly<Expression>): Expression | null {
    return exp as Expression;
  }
}
