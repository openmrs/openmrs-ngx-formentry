import * as _ from 'lodash';

let encStore: any = {

  data: [],

  getValue(key, index) {
    return {
      label: 'Yes',
      value: 'a899b35c-1350-11df-a1f1-0026b9348838'
    };
  },

  getAllObjects() {
    return [{}];
  },



  getSingleObject(index) {
    return {};
  }
};

export class HistoricalDataService {

  store: any = {};

  constructor() {
    this.putObject('prevEnc', encStore);
  }

  putObject(name, object): void {
    this.store[name] = object;
  }

  getObject(name): any {

    if (!_.has(this.store, name)) {
      console.error('No object stored under name ' + name);
      return null;
    }
    return this.store[name];
  };

  hasKey(name): boolean {
    return _.has(this.store, name) ? true : false;
  };

  removeAllObjects() {
    this.store = {};
  };

}
