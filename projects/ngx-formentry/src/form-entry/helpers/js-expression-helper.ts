
export class JsExpressionHelper {

  calcBMI(height, weight) {

    let r;
    if (height && weight) {
      r = (weight / (height / 100 * height / 100)).toFixed(1);
    }
    return height && weight ? parseFloat(r) : null;
  }

  isEmpty(val) {

    if (val === undefined || val === null || val === '' || val === 'null' || val === 'undefined') {
      return true;
    }

    if (Array.isArray(val) && val.length === 0) {
      return true;
    }
    return false;
  }

  arrayContains(array, members) {

    if (Array.isArray(members)) {

      if (members.length === 0) {
        return true;
      }

      let contains = true;

      for (let i = 0; i < members.length; i++) {
        const val = members[i];
        if (array.indexOf(val) === -1) {
          contains = false;
        }
      }

      return contains;
    } else {
      return array.indexOf(members) !== -1;
    }
  }
  extractRepeatingGroupValues(key, array) {
    const values = array.map(function(item) {
    return item[key];
    });
  return values;
  }
  formatDate(value, format, offset) {

    format = format || 'yyyy-MM-dd';
    offset = offset || '+0300';

    if (!(value instanceof Date)) {

      value = new Date(value);
      if (value === null || value === undefined) {
        throw new Error('DateFormatException: value passed ' +
          'is not a valid date');
      }
    }

    return value; // TODO implement this
    // return $filter('date')(value, format, offset);
  }

  arrayContainsAny(array, members) {

    if (Array.isArray(members)) {
      if (members.length === 0) {
        return true;
      }
      let contains = false;

      for (let i = 0; i < members.length; i++) {

        const val = members[i];
        if (array.indexOf(val) !== -1) {
          contains = true;
        }
      }
      return contains;
    } else {
      return array.indexOf(members) !== -1;
    }
  }

  get helperFunctions() {
    const helper = this;
    return {
      arrayContainsAny: helper.arrayContainsAny,
      calcBMI: helper.calcBMI,
      isEmpty: helper.isEmpty,
      arrayContains: helper.arrayContains,
      extractRepeatingGroupValues: helper.extractRepeatingGroupValues,
    };
  }
}
