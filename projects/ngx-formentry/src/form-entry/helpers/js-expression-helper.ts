import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { southEastAsiaCvdRiskTables } from './risk-dataset-table';

@Injectable()
export class JsExpressionHelper {
  calcBMI(height, weight) {
    let r;
    if (height && weight) {
      r = (weight / (((height / 100) * height) / 100)).toFixed(1);
    }
    return height && weight ? parseFloat(r) : null;
  }

  calcBSA(height: number, weight: number) {
    let result;
    if (height && weight) {
      result = Math.sqrt((height * weight) / 3600).toFixed(2);
    }
    return height && weight ? parseFloat(result) : null;
  }

  calcBMIForAgeZscore(bmiForAgeRef, height, weight) {
    let bmi;
    const maxAgeInDays = 1856;
    if (height && weight) {
      bmi = (weight / (((height / 100) * height) / 100)).toFixed(1);
    }
    const refSectionObject = _.first(bmiForAgeRef);
    let formattedSDValue;
    if (refSectionObject) {
      const refObjectValues = Object.keys(refSectionObject)
        .map((key) => refSectionObject[key])
        .map((x) => x);
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

      if (
        formattedSDValue === 'S' ||
        formattedSDValue === 'L' ||
        formattedSDValue === 'M' ||
        formattedSDValue === '-5'
      ) {
        formattedSDValue = '-4';
      }
    }

    return bmi && refSectionObject ? formattedSDValue : null;
  }
  calcWeightForHeightZscore(weightForHeightRef, height, weight) {
    let refSection;
    let formattedSDValue;
    if (height && weight) {
      height = parseFloat(height).toFixed(1);
    }
    const standardHeightMin = 45;
    const standardMaxHeight = 110;
    if (height < standardHeightMin || height > standardMaxHeight) {
      formattedSDValue = -4;
    } else {
      refSection = _.filter(weightForHeightRef, (refObject) => {
        return parseFloat(refObject['Length']).toFixed(1) === height;
      });
    }

    const refSectionObject = _.first(refSection);
    if (refSectionObject) {
      const refObjectValues = Object.keys(refSectionObject)
        .map((key) => refSectionObject[key])
        .map((x) => x);
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
      if (
        formattedSDValue === 'S' ||
        formattedSDValue === 'L' ||
        formattedSDValue === 'M' ||
        formattedSDValue === '-5'
      ) {
        formattedSDValue = '-4';
      }
    }

    return height && weight ? formattedSDValue : null;
  }

  calcHeightForAgeZscore(heightForAgeRef, height, weight) {
    const refSectionObject = _.first(heightForAgeRef);
    let formattedSDValue;
    if (refSectionObject) {
      const refObjectValues = Object.keys(refSectionObject)
        .map((key) => refSectionObject[key])
        .map((x) => x);
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

      if (
        formattedSDValue === 'S' ||
        formattedSDValue === 'L' ||
        formattedSDValue === 'M' ||
        formattedSDValue === '-5'
      ) {
        formattedSDValue = '-4';
      }
    }

    return height && weight && refSectionObject ? formattedSDValue : null;
  }

  calcSouthEastAsiaNonLabCVDRisk(
    sex: 'M' | 'F',
    smoker?: boolean,
    age?: number,
    sbp?: number,
    bmi?: number
  ) {
    const hasValidValues =
      typeof sex === 'string' &&
      typeof smoker === 'boolean' &&
      typeof age === 'number' &&
      typeof sbp === 'number' &&
      typeof bmi === 'number';

    if (!hasValidValues) {
      return null;
    }
    // Bin functions
    const getAgeBin = (age) =>
      Math.floor((Math.min(Math.max(40, age), 74) - 40) / 5);
    const getSbpBin = (sbp) =>
      Math.max(0, Math.floor((Math.min(sbp, 180) - 120) / 20) + 1);
    const getBmiBin = (bmi) =>
      Math.max(0, Math.floor((Math.min(bmi, 35) - 20) / 5) + 1);

    // Variables
    const sexIdx = sex === 'M' ? 0 : 1;
    const smokerIdx = smoker ? 1 : 0;
    const ageIdx = 6 - getAgeBin(age);
    const bmiIdx = getBmiBin(bmi);
    const sbpIdx = 4 - getSbpBin(sbp);

    return southEastAsiaCvdRiskTables[sexIdx][smokerIdx][ageIdx][sbpIdx][
      bmiIdx
    ];
  }

  isEmpty(val) {
    if (
      val === undefined ||
      val === null ||
      val === '' ||
      val === 'null' ||
      val === 'undefined'
    ) {
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
    const values = array.map(function (item) {
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
        throw new Error(
          'DateFormatException: value passed ' + 'is not a valid date'
        );
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

  /**
   * Takes a target control, an encounter and concept uuid. If the target control has a value it returns it
   * otherwise it tries to find it in the encounter. Finally it returns null of it can't find either of them.
   * @param targetControl
   * @param rawEncounter
   * @param uuid
   * @returns
   */
  getObsFromControlOrEncounter(targetControl, rawEncounter, uuid): any {
    const findObs = (obs, uuid) => {
      let result;
      obs?.some(
        (o) =>
          (result =
            o?.concept?.uuid === uuid ? o : findObs(o.groupMembers || [], uuid))
      );
      return result;
    };
    const obsValue = findObs(rawEncounter?.obs, uuid)?.value;
    return !!targetControl
      ? targetControl
      : typeof obsValue === 'object'
      ? obsValue.uuid
      : !!obsValue
      ? obsValue
      : null;
  }

  /**
   * Fetches data from a given URL and extracts a nested object based on the provided objectPath.
   * @async
   * @param {string} url - The URL from which to fetch data.
   * @param {string} objectPath - The dot-separated path to the nested object to extract.
   * @returns {Promise<object>} A promise that resolves with the extracted nested object.
   * @throws {Error} Will throw an error if the arguments are invalid, the fetch fails, or if the object path cannot be resolved.
   */
  async fetchData(url, objectPath, options = {}) {
    try {
      const response = await fetch(url, { ...options });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const nestedObject = objectPath.split('.').reduce((obj, key) => {
        if (obj && obj.hasOwnProperty(key)) {
          return obj[key];
        }
        return `Unable to access the property '${key}' in your object.`;
      }, data);

      return nestedObject;
    } catch (error) {
      console.error(`An error occurred: ${error}`);
      throw error;
    }
  }

  doesNotMatchExpression(regexString: string, val: string | null | undefined): boolean {
    if (!val || ['undefined', 'null', ''].includes(val.toString())) {
      return true;
    }
    const pattern = new RegExp(regexString); 
    if (!pattern.test(val)) {
      return true;
    }
    return false;
  }

  calcGravida(parityTerm, parityAbortion) {
    let gravida = 0;

    if (Number.isInteger(parityTerm)) {
      gravida += parityTerm + 1;
    }

    if (Number.isInteger(parityAbortion)) {
      gravida += parityAbortion + 1;
    }

    if (Number.isInteger(parityTerm) && Number.isInteger(parityAbortion)) {
      gravida = parityTerm + parityAbortion + 1;
    }

    return gravida;
  }

  get helperFunctions() {
    const helper = this;
    return {
      arrayContainsAny: helper.arrayContainsAny,
      calcBMI: helper.calcBMI,
      calcBMIForAgeZscore: helper.calcBMIForAgeZscore,
      calcWeightForHeightZscore: helper.calcWeightForHeightZscore,
      calcHeightForAgeZscore: helper.calcHeightForAgeZscore,
      calcSouthEastAsiaNonLabCVDRisk: helper.calcSouthEastAsiaNonLabCVDRisk,
      isEmpty: helper.isEmpty,
      arrayContains: helper.arrayContains,
      extractRepeatingGroupValues: helper.extractRepeatingGroupValues,
      getObsFromControlOrEncounter: helper.getObsFromControlOrEncounter,
      doesNotMatchExpression: helper.doesNotMatchExpression,
      calcGravida: helper.calcGravida,
      fetchData: helper.fetchData
    };
  }
}
