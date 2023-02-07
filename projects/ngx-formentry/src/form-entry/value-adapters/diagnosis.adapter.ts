import {Injectable} from '@angular/core';
import {Form} from '../form-factory/form';
import {ValueAdapter} from './value.adapter';

@Injectable()
export class DiagnosisValueAdapter implements ValueAdapter {
  formDiagnosisNodes = [];

  generateFormPayload(form: Form) {
    this.formDiagnosisNodes = [];
    this._findDiagnosisQuestionNodes(form.rootNode);
    return this._createDiagnosesPayload(this.formDiagnosisNodes, form.existingDiagnoses);
  }

  populateForm(form: Form, payload) {
    form.existingDiagnoses = payload.diagnoses?.filter(d => {
      return !d.voided;
    });
    this.formDiagnosisNodes = [];
    this._findDiagnosisQuestionNodes(form.rootNode);
    this._setDiagnosesValues(this.formDiagnosisNodes, form.existingDiagnoses);
  }

  private _createDiagnosesPayload(diagnosisNodes, existingDiagnoses) {
    const payload: Array<Diagnosis> = [];
    const selectedDiagnoses: Array<Diagnosis> = [];
    let deletedDiagnoses: Array<Diagnosis> = [];

    diagnosisNodes?.forEach(node => {
      node.control.value.filter(v => v[node.question.key].uuid).forEach(value => {
        // Create Payload
        const payloadDiagnosis = this._createPayloadDiagnosis(
          value[node.question.key].uuid,
          node.question.extras
        );
        // Validate if is new value
        const existingDiagnosis = existingDiagnoses.find(d => d.diagnosis.coded.uuid == payloadDiagnosis.diagnosis.coded.uuid);
        if (payloadDiagnosis.diagnosis.coded.uuid && !this._compareDiagnoses(existingDiagnosis, payloadDiagnosis)) {
          payload.push(payloadDiagnosis);
        }
        selectedDiagnoses.push(payloadDiagnosis);
      });
    });

    deletedDiagnoses = this._getDeletedDiagnoses(selectedDiagnoses, existingDiagnoses);
    return payload.concat(deletedDiagnoses);
  }

  private _createPayloadDiagnosis(codedUuid, questionExtras): Diagnosis {
    const diagnosis: Diagnosis = {
      diagnosis: {
        coded: {
          uuid: codedUuid
        },
        nonCoded: '',
      },
      certainty: 'CONFIRMED',
      rank: 1,
      voided: false
    };
    //TODO diagnosis.certainty = quesitonExtras.questionOptions.certainty;
    //TODO diagnosis.rank = quesitonExtras.questionOptions.rank;

    return diagnosis;
  }

  private _getDeletedDiagnoses(selectedDiagnoses: Array<Diagnosis>, existingDiagnoses: Array<Diagnosis>): Array<Diagnosis> {
    return existingDiagnoses?.filter(e => {
      return !selectedDiagnoses.find(s => {
        return !e.voided && s.diagnosis.coded.uuid === e.diagnosis.coded.uuid;
      });
    }).map(d => {
      d.voided = true;
      return d;
    });
  }

  private _setDiagnosesValues(formDiagnosisNodes, existingDiagnoses: Array<Diagnosis>) {
    formDiagnosisNodes?.forEach(node => {
      node['initialValue'] = existingDiagnoses;
      existingDiagnoses.forEach((diagnosis, index) => {
        node.createChildNode();
        const value = {};
        value[node.question.key] = diagnosis.diagnosis.coded;
        const childNode = node.children[index];
        childNode.control.setValue(value);
        childNode['initialValue'] = value;
        //childNode['diagnosesCertainty'] = diagnosis.certainty;
        //childNode['diagnosesRank'] = diagnosis.rank;
      });
    });
  }

  private _findDiagnosisQuestionNodes(formNode) {
    if (formNode.children) {
      if (formNode.children instanceof Object) {
        for (const key in formNode.children) {
          if (formNode.children.hasOwnProperty(key)) {
            switch (formNode.children[key].question.renderingType) {
              case 'page':
                this._findDiagnosisQuestionNodes(formNode.children[key]);
                break;
              case 'section':
                this._findDiagnosisQuestionNodes(formNode.children[key]);
                break;
              case 'group':
                this._findDiagnosisQuestionNodes(formNode.children[key]);
                break;
              case 'repeating':
                if (formNode.children) {
                  for (const node in formNode.children) {
                    const question = formNode.children[node].question;
                    if (question.extras && question.extras.type === 'diagnosis') {
                      this.formDiagnosisNodes.push(formNode.children[node]);
                    }
                  }
                }
                break;
              default:
                break;
            }
          }
        }
      }
    }
  }

  private _compareDiagnoses(existingDiagnosis: Diagnosis, payloadDiagnosis: Diagnosis): boolean {
    let isEqual: boolean = true;
    isEqual = isEqual && existingDiagnosis?.diagnosis.coded.uuid === payloadDiagnosis?.diagnosis.coded.uuid;
    isEqual = isEqual && existingDiagnosis?.diagnosis.nonCoded === payloadDiagnosis?.diagnosis.nonCoded;
    isEqual = isEqual && existingDiagnosis?.rank === payloadDiagnosis?.rank;
    isEqual = isEqual && existingDiagnosis?.certainty === payloadDiagnosis?.certainty;
    return isEqual;
  }
}

export interface Diagnosis {
  uuid?: string;
  display?: string;
  encounter?: string;
  patient?: string;
  diagnosis: {
    coded?: {
      uuid: string;
      display?: string;
    };
    nonCoded?: string;
  };
  certainty: 'CONFIRMED' | 'PROVISIONAL';
  rank: 1 | 2;
  voided?: boolean;
}
