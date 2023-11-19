import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { PredictionObject } from './types';
import moment from 'moment';

@Injectable()
export class MachineLearningService {
  constructor(private http: HttpClient) {}

  public fetchPredictionScore(predicationPayload) {
    const url = `/openmrs/ws/rest/v1/keml/casefindingscore`;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Access-Control-Allow-Origin', '*');
    return this.http.post(url, predicationPayload, { headers: headers });
  }

  public predictRisk(res) {
    // Check if the prediction is available
    const probabilityForPositivity = res?.result?.predictions['probability(1)'];
    if (!probabilityForPositivity) {
      return { message: 'No results found', riskScore: null };
    }

    // Define risk thresholds
    const highRiskThreshold = 0.1079255;
    const mediumRiskThreshold = 0.02795569;
    const lowRiskThreshold = 0.005011473;

    // Define risk messages
    const riskMessages = {
      veryHigh:
        'This client has a very high probability of a HIV positive test result. Testing is strongly recommended',
      high:
        'This client has a high probability of a HIV positive test result. Testing is strongly recommended',
      medium:
        'This client has a medium probability of a HIV positive test result. Testing is recommended',
      low:
        'This client has a low probability of a HIV positive test result. Testing may not be recommended'
    };
    0.1079255<=0.936823 && 0.1079255>0.02795569
    // Determine risk level and corresponding message
    let riskLevel;
    if (probabilityForPositivity > highRiskThreshold) {
      riskLevel = 'veryHigh';
    } else if (
      probabilityForPositivity <= highRiskThreshold &&
      probabilityForPositivity > mediumRiskThreshold
    ) {
      riskLevel = 'high';
    } else if (
      probabilityForPositivity <= mediumRiskThreshold &&
      probabilityForPositivity > lowRiskThreshold
    ) {
      riskLevel = 'medium';
    } else if (probabilityForPositivity <= lowRiskThreshold) {
      riskLevel = 'low';
    }

    return {
      message: riskMessages[riskLevel],
      riskScore: probabilityForPositivity
    };
  }

  public mapToMLModel(result: any, patientAge: number): PredictionObject {
    const dateSelf = result['dateSelf']
      ? moment(result['dateSelf']).diff(new Date())
      : 0;
    const dateProvider = result['dateProvider']
      ? moment(result['dateProvider']).diff(new Date())
      : 0;

    return {
      pAge: patientAge,
      latestMaritalStatus: '',
      populationType: result['populationType'] ?? '',
      keyPopulationVal: result['kpTypeMale'] ?? result['kpTypeFemale'] ?? '',
      priPopulationVal: result['ppType'] ?? '',
      testHistory: result['testHistory'] ?? '',
      testedAs: '',
      htsEntryPoint: result['facilityHTStrategy'] ?? '',
      htsDepartment: result['patDepart'] ?? '',
      monthsSinceLastTestInt: dateProvider ?? dateSelf ?? 0,
      testStrategy: result['facilityHTStrategy'] ?? '',
      selfTested: result['teSteR'] ?? '',
      tbScreening: result['screenedTB'] ?? '',
      onPREP: result['currentlyPrep'] ?? '',
      hasSTI: result['currentlySti'] ?? '',
      activeSexually: result['activeSexually'] ?? '',
      newPartner: result['newPartner'] ?? '',
      isHealthWorker: result['hcwCare'] ?? '',
      partnerHIVStatus: result['partnerHivStatus'] ?? '',
      numberOfPartnersInt: result['noSexPartners'] ?? '',
      alcoholicSex: result['alcoholicSex'] ?? '',
      moneySex: result['moneySex'] ?? '',
      condomBurst: result['condomBurst'] ?? '',
      strangerSex: result['strangerSex'] ?? '',
      positiveSex: result['knownPositive'] ?? '',
      patientPregnant: result['preGnant'] ?? '',
      patientBreastFeeding: result['breastfeeding'] ?? '',
      GBVExperienced: result['experiencedGbv'] ?? '',
      sharedNeedle: result['needleShared'] ?? '',
      needleStickInjuries: result['needleStick'] ?? '',
      traditionalProcedures: result['__tDI8Dp4Ly'] ?? '',
      mothersStatus: result['motHersHivstatus'],
      patientReferred: result['clientReferred'] ?? '',
      discordantCouple: result['coupleDiscordant'] ?? '',
      sexualContactChecked:
        result['cricAdulT'] === '163565AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
          ? true
          : false,
      socialContactChecked:
        result['cricAdulT'] === '166606AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
          ? true
          : false,
      noneContactChecked:
        result['cricAdulT'] === '1107AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
          ? true
          : false,
      needleSharingContactChecked:
        result['cricAdulT'] === '166517AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
          ? true
          : false,
      prepServiceChecked: result['prepService'] ? true : false,
      pepServiceChecked: result['pepService'] ? true : false,
      tbServiceChecked: false,
      stiServiceChecked: result['stiService'] ? true : false,
      GBVSexualChecked: false,
      GBVPhysicalChecked: false,
      GBVEmotionalChecked: false
    };
  }
}
