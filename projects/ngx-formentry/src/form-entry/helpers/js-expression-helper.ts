
import * as _ from 'lodash';
export class JsExpressionHelper {

  calcBMI(height, weight) {

    let r;
    if (height && weight) {
      r = (weight / (height / 100 * height / 100)).toFixed(1);
    }
    return height && weight ? parseFloat(r) : null;
  }

  calcBMIForAgeZscore(bmiForAgeRef, height, weight) {
   let bmi;
   const maxAgeInDays = 1856;
    if (height && weight) {
      bmi = (weight / (height / 100 * height / 100)).toFixed(1);
    }
    const refSectionObject = _.first(bmiForAgeRef);
    let formattedSDValue;
    if (refSectionObject) {
      const refObjectValues = Object.keys(refSectionObject).map(
        (key) => refSectionObject[key]).map( (x) => x);
        const refObjectKeys = Object.keys(refSectionObject);
        const minimumValue = refObjectValues[1];
        const minReferencePoint = [];
        if (bmi < minimumValue) {
          minReferencePoint.push(minimumValue);
        } else {
          _.forEach(refObjectValues, (value) => {
          if (value <= bmi) {
          minReferencePoint.push(value);
          }
          });
        }
        const lastReferenceValue = _.last(minReferencePoint);
        const lastValueIndex = _.findIndex(refObjectValues, (o) => {
        return o === lastReferenceValue;
        });
        const SDValue = refObjectKeys[lastValueIndex];
        formattedSDValue = SDValue.replace('SD', '');
        if (formattedSDValue.includes('neg')) {
          formattedSDValue = formattedSDValue.substring(1, 0);
          formattedSDValue = '-' + formattedSDValue;
        }

        if ( formattedSDValue === 'S' || formattedSDValue === 'L' || formattedSDValue === 'M' || formattedSDValue === '-5') {
          formattedSDValue = '-4';
        }

    }

    return  bmi && refSectionObject ?  formattedSDValue : null;
  }
  calcWeightForHeightZscore(weightForHeightRef, height, weight) {
    let refSection ;
    let formattedSDValue;
    if (height && weight) {
      height = parseFloat(height).toFixed(1);
    }
    const standardHeightMin = 45;
    const standardMaxHeight = 110;
    if ( height < standardHeightMin || height > standardMaxHeight) {
      formattedSDValue = -4;
    } else {
        refSection = _.filter(weightForHeightRef, (refObject) => {
        return parseFloat(refObject['Length']).toFixed(1) === height;
      });
    }

    const refSectionObject = _.first(refSection);
    if (refSectionObject) {
      const refObjectValues = Object.keys(refSectionObject).map(
        (key) => refSectionObject[key]).map( (x) => x);
        const refObjectKeys = Object.keys(refSectionObject);
        const minimumValue = refObjectValues[1];
        const minReferencePoint = [];
        if (weight < minimumValue) {
          minReferencePoint.push(minimumValue);
        } else {
          _.forEach(refObjectValues, (value) => {
          if (value <= weight) {
          minReferencePoint.push(value);
          }
          });

        }
        const lastReferenceValue = _.last(minReferencePoint);
        const lastValueIndex = _.findIndex(refObjectValues, (o) => {
        return o === lastReferenceValue;
        });
        const SDValue = refObjectKeys[lastValueIndex];
        formattedSDValue = SDValue.replace('SD', '');
        if (formattedSDValue.includes('neg')) {
          formattedSDValue = formattedSDValue.substring(1, 0);
          formattedSDValue = '-' + formattedSDValue;
        }
        if ( formattedSDValue === 'S' || formattedSDValue === 'L' || formattedSDValue === 'M'  || formattedSDValue === '-5') {
          formattedSDValue = '-4';
        }

    }

    return  height && weight  ?  formattedSDValue : null;
  }

  calcHeightForAgeZscore(heightForAgeRef, height, weight) {

    const refSectionObject = _.first(heightForAgeRef);
    let formattedSDValue;
    if (refSectionObject) {
      const refObjectValues = Object.keys(refSectionObject).map(
        (key) => refSectionObject[key]).map( (x) => x);
        const refObjectKeys = Object.keys(refSectionObject);
        const minimumValue = refObjectValues[1];
        const minReferencePoint = [];
        if (height < minimumValue) {
          minReferencePoint.push(minimumValue);
        } else {
          _.forEach(refObjectValues, (value) => {
          if (value <= height) {
          minReferencePoint.push(value);
          }
          });
        }
        const lastReferenceValue = _.last(minReferencePoint);
        const lastValueIndex = _.findIndex(refObjectValues, (o) => {
        return o === lastReferenceValue;
        });
        const SDValue = refObjectKeys[lastValueIndex];
        formattedSDValue = SDValue.replace('SD', '');
        if (formattedSDValue.includes('neg')) {
          formattedSDValue = formattedSDValue.substring(1, 0);
          formattedSDValue = '-' + formattedSDValue;
        }

        if ( formattedSDValue === 'S' || formattedSDValue === 'L' || formattedSDValue === 'M'  || formattedSDValue === '-5') {
          formattedSDValue = '-4';
        }

    }

    return  height && weight && refSectionObject ?  formattedSDValue : null;
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
      calcBMIForAgeZscore: helper.calcBMIForAgeZscore,
      calcWeightForHeightZscore: helper.calcWeightForHeightZscore,
      calcHeightForAgeZscore: helper.calcHeightForAgeZscore,
      isEmpty: helper.isEmpty,
      arrayContains: helper.arrayContains,
      extractRepeatingGroupValues: helper.extractRepeatingGroupValues
    };
  }
}
