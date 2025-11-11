import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { southEastAsiaCvdRiskTables } from './risk-dataset-table';
import moment from 'moment';
import { getAssessmentCode } from './depression-assessment';

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
    if (array === null || array === undefined) {
      return false;
    }

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

    if (value === null || value === undefined || value === '') {
      throw new Error('DateFormatException: value passed is not a valid date');
    }

    const date = moment(value);
    if (!date.isValid()) {
      throw new Error('DateFormatException: value passed is not a valid date');
    }

    if (offset) {
      date.utcOffset(offset);
    }

    const momentFormat = format
      .replace(/yyyy/g, 'YYYY')
      .replace(/yy/g, 'YY')
      .replace(/dd/g, 'DD');
    return date.format(momentFormat);
  }

  arrayContainsAny(array, members) {
    if (array === null || array === undefined) {
      return false;
    }

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
      const response = await fetch(url, {
        ...options
      });
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

  doesNotMatchExpression(
    regexString: string,
    val: string | null | undefined
  ): boolean {
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

  calculateZNutritionScore(zScore: number) {
    if (zScore > -1) return '1115AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
    if (zScore === -1) return '123814AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
    if (zScore === -2) return '123815AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
    if (zScore === -3) return '123815AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
    if (zScore === -4) return '164131AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
    return '';
  }

  getObsValue(
    obs: Array<{ concept: { uuid: string }; value: any }>,
    conceptUuid: string
  ) {
    const obsValue = obs.find((o) => o.concept.uuid === conceptUuid)?.value;
    return obsValue;
  }

  // -------- Triage Early Warning Score (TEWS): South African model --------

  calcSouthAfricanTEWS(
    age: number | null,
    heightCm: number | null,
    respRate: number | null,
    heartRate: number | null,
    temperature: number | null,
    systolicBP: number | null,
    avpuLevelChild?: string | null,
    avpuLevelAdult?: string | null,
    mobilityChild?: string | null,
    mobilityAdult?: string | null,
    trauma?: string | null
  ) {
    const UUID = {
      ROUTINE: '1115AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      URGENT: '1883AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      VERY_URGENT: '159409AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      EMERGENCY: '1882AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      TRAUMA_YES: '1065AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
    };

    const isValid = (num: any): boolean =>
      num !== null && num !== undefined && num !== '' && !isNaN(num);

    const isValidCode = (val: any): boolean =>
      typeof val === 'string' && val.trim().length > 0;

    const hasAnyInput =
      [respRate, heartRate, temperature, systolicBP].some(isValid) ||
      [
        avpuLevelChild,
        avpuLevelAdult,
        mobilityChild,
        mobilityAdult,
        trauma
      ].some(isValidCode);

    if (!hasAnyInput) {
      return {
        score: 0,
        priority: UUID.ROUTINE,
        category: 'UNKNOWN'
      };
    }
    // Determine patient category
    const determineCategory = (): string => {
      if (isValid(heightCm)) {
        if (heightCm < 95) return 'YOUNGER_CHILD';
        if (heightCm <= 150) return 'OLDER_CHILD';
      } else if (isValid(age)) {
        if (age < 3) return 'YOUNGER_CHILD';
        if (age <= 12) return 'OLDER_CHILD';
      }
      return 'ADULT';
    };

    const category = determineCategory();
    let score = 0;

    // AVPU (Alert, Voice, Pain, Unresponsive)
    const avpuScore = (val: string | null | undefined): number => {
      const map: Record<string, number> = {
        '160282AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA': 0, // Alert
        '162645AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA': 1, // Voice
        '162644AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA': 2, // Pain
        '120345AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA': 2, // Confused
        '159508AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA': 3 // Unresponsive
      };
      return map[val ?? ''] ?? 0;
    };

    // Mobility scoring
    const mobilityScore = (val: string | null | undefined): number => {
      const map: Record<string, number> = {
        '162750AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA': 0, // Walking
        '1115AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA': 0, // Normal for age
        '162751AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA': 1, // Assisted
        '162752AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA': 2, // Immobile
        'ebdcb8b4-8089-422c-a636-f8aeb44e6eed': 2 // Unable to move
      };
      return map[val ?? ''] ?? 0;
    };

    // Scoring per Category
    switch (category) {
      case 'YOUNGER_CHILD':
        if (isValid(respRate)) {
          if (respRate < 20) score += 3;
          else if (respRate <= 25) score += 2;
          else if (respRate <= 39) score += 0;
          else if (respRate <= 49) score += 2;
          else score += 3;
        }
        if (isValid(heartRate)) {
          if (heartRate < 70) score += 3;
          else if (heartRate <= 79) score += 2;
          else if (heartRate <= 130) score += 0;
          else if (heartRate <= 159) score += 2;
          else score += 3;
        }
        if (isValid(temperature)) {
          if (temperature < 35 || temperature > 38.4) score += 2;
        }
        score += avpuScore(avpuLevelChild);
        score += mobilityScore(mobilityChild);
        if (trauma === UUID.TRAUMA_YES) score += 1;
        break;

      case 'OLDER_CHILD':
        if (isValid(respRate)) {
          if (respRate < 15) score += 3;
          else if (respRate <= 16) score += 2;
          else if (respRate <= 21) score += 0;
          else if (respRate <= 26) score += 1;
          else score += 2;
        }
        if (isValid(heartRate)) {
          if (heartRate < 60) score += 3;
          else if (heartRate <= 79) score += 2;
          else if (heartRate <= 99) score += 0;
          else if (heartRate <= 129) score += 1;
          else score += 2;
        }
        if (isValid(temperature)) {
          if (temperature < 35 || temperature > 38.4) score += 2;
        }
        score += avpuScore(avpuLevelChild);
        score += mobilityScore(mobilityChild);
        if (trauma === UUID.TRAUMA_YES) score += 1;
        break;

      case 'ADULT':
        if (isValid(respRate)) {
          if (respRate < 9) score += 2;
          else if (respRate <= 14) score += 0;
          else if (respRate <= 20) score += 1;
          else if (respRate <= 29) score += 2;
          else score += 3;
        }
        if (isValid(heartRate)) {
          if (heartRate < 41) score += 2;
          else if (heartRate <= 50) score += 1;
          else if (heartRate <= 100) score += 0;
          else if (heartRate <= 110) score += 1;
          else if (heartRate <= 129) score += 2;
          else score += 3;
        }
        if (isValid(temperature)) {
          if (temperature < 35 || temperature > 38.4) score += 2;
        }
        if (isValid(systolicBP)) {
          if (systolicBP < 71) score += 3;
          else if (systolicBP <= 80) score += 2;
          else if (systolicBP <= 100) score += 1;
          else if (systolicBP > 199) score += 2;
        }
        score += avpuScore(avpuLevelAdult);
        score += mobilityScore(mobilityAdult);
        if (trauma === UUID.TRAUMA_YES) score += 1;
        break;
    }

    // Priority Mapping
    const priority =
      score >= 7
        ? UUID.EMERGENCY
        : score >= 5
        ? UUID.VERY_URGENT
        : score >= 3
        ? UUID.URGENT
        : UUID.ROUTINE;

    return { score, priority, category };
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
      fetchData: helper.fetchData,
      calculateZNutritionScore: helper.calculateZNutritionScore,
      getObsValue: helper.getObsValue,
      getAssessmentCode: getAssessmentCode,
      calcSouthAfricanTEWS: helper.calcSouthAfricanTEWS
    };
  }
}
