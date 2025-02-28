// Constants for scoring UUIDs
const SCORE_1_UUID = '163734AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
const SCORE_2_UUID = '163735AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
const SCORE_3_UUID = '163736AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';

// Constants for anxiety assessment codes these are concepts mapped to KenyaEMR concepts
const MINIMAL_ANXIETY_CODE = '1115AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'; // Depression with minimal anxiety
const MILD_ANXIETY_CODE = '157790AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'; // Mild anxiety
const MODERATE_ANXIETY_CODE = '134011AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'; // Moderate anxiety
const SEVERE_ANXIETY_CODE = '134017AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'; // Severe anxiety
const VERY_SEVERE_ANXIETY_CODE = '126627AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'; // Very severe anxiety

// Mapping of UUIDs to scores
const UUID_TO_SCORE = {
  [SCORE_1_UUID]: 1,
  [SCORE_2_UUID]: 2,
  [SCORE_3_UUID]: 3
};

/**
 * Calculates the score for a single variable.
 * @param {string|object} variable - The input variable, either a string or an object with a uuid property.
 * @returns {number} The score (0, 1, 2, or 3).
 */
function getScore(variable) {
  if (variable === undefined || variable === null || variable === '') {
    return 0;
  }
  const value = typeof variable === 'object' ? variable.uuid : String(variable);
  return UUID_TO_SCORE[value] || 0;
}

/**
 * Calculates the total anxiety score from an array of variables.
 * @param {Array} variables - Array of symptom variables.
 * @returns {number} The total score.
 */
function calculateScore(variables) {
  return variables.reduce((sum, variable) => sum + getScore(variable), 0);
}

/**
 * Determines the anxiety assessment code based on symptom inputs.
 * @param {string|object} noInterest - Lack of interest symptom.
 * @param {string|object} depressed - Depression symptom.
 * @param {string|object} speakingSlowly - Slow speech symptom.
 * @param {string|object} betterDead - Thoughts of being better off dead symptom.
 * @param {string|object} sleep - Sleep issues symptom.
 * @param {string|object} feelingTired - Fatigue symptom.
 * @param {string|object} poorAppetite - Appetite issues symptom.
 * @param {string|object} troubled - Feeling troubled symptom.
 * @param {string|object} feelingBad - Feeling bad about oneself symptom.
 * @returns {string} The anxiety assessment code.
 */
export function getAssessmentCode(
  noInterest,
  depressed,
  speakingSlowly,
  betterDead,
  sleep,
  feelingTired,
  poorAppetite,
  troubled,
  feelingBad
) {
  const variables = [
    noInterest,
    depressed,
    sleep,
    feelingTired,
    poorAppetite,
    troubled,
    feelingBad,
    speakingSlowly,
    betterDead
  ];
  const anxiety = calculateScore(variables);
  const hasMinimalDepressionSymptoms = Boolean(
    noInterest !== '' && depressed !== ''
  );

  if (!hasMinimalDepressionSymptoms) {
    return '';
  } else if (anxiety < 5) {
    return MINIMAL_ANXIETY_CODE;
  } else if (anxiety < 10) {
    return MILD_ANXIETY_CODE;
  } else if (anxiety < 15) {
    return MODERATE_ANXIETY_CODE;
  } else if (anxiety < 20) {
    return SEVERE_ANXIETY_CODE;
  } else {
    return VERY_SEVERE_ANXIETY_CODE;
  }
}
