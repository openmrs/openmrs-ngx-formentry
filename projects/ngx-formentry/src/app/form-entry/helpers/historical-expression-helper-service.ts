import { HistoricalDataService } from '../services/historical-data-service.mock';
import * as _ from 'lodash';

export class HistoricalHelperService {

  public functions: Array<string> = [];
  public HD: HistoricalDataService;
  constructor() {
    this.HD = new HistoricalDataService();
    this.functions = this.getClassMethods(this);
  }

  public evaluate(expr: string): any {

    _.each(this.functions, (v) => {

      if (expr.indexOf(v) !== -1) {
        expr = expr.replace(new RegExp(v, 'g'), 'this.' + v);
      }

    });
    // remove duplicates TODO: not the best way
    expr = expr.replace('this.this.', 'this.');

    // tslint:disable-next-line:no-eval
    return eval(expr);
  }

  public arrayContains(array: Array<any>, members: any) {

    return this.contains(array, members, true);

  }

  public arrayContainsAny(array: Array<any>, members: any) {

    return this.contains(array, members, false);

  }

  private contains(array: Array<any>, members: any, _contains: boolean) {

    if (_.isArray(members)) {
      if (members.length === 0) {
        return true;
      }
      let contains = _contains;
      _.each(members, (val) => {
        if (array.indexOf(val) === -1) {
          contains = false;
        } else {
          contains = true;
        }
      });
      return contains;
    } else {
      return array.indexOf(members) !== -1;
    }
  }

  public getClassMethods(obj) {

    let props = [];

    do {
      props = props.concat(Object.getOwnPropertyNames(obj));
    } while (obj = Object.getPrototypeOf(obj));

    // remove duplicates
    return props.filter((v, i, self) => {
      return self.indexOf(v) === i;
    });
  }

}
