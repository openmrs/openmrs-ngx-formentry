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

  populateForm(form: Form, diagnoses:Array<Diagnosis>) {
    form.existingDiagnoses = diagnoses?.filter(d => {
      return !d.voided;
    });
    this.formDiagnosisNodes = [];
    this._findDiagnosisQuestionNodes(form.rootNode);
    this._setDiagnosesValues(this.formDiagnosisNodes, form.existingDiagnoses, 1);
    this._setDiagnosesValues(this.formDiagnosisNodes, form.existingDiagnoses, 2);
  }

  private _createDiagnosesPayload(diagnosisNodes, existingDiagnoses) {
    const payload: Array<DiagnosisPayload> = [];
    let deletedDiagnoses: Array<DiagnosisPayload> = [];

    diagnosisNodes?.forEach(node => {
      node.control.value.filter(v => v[node.question.key]).forEach(value => {
        // Create Payload
        const payloadDiagnosis = this._createPayloadDiagnosis(
          value[node.question.key],
          node.question.extras
        );
        // Validate if is new value
          payload.push(payloadDiagnosis);
      });
    });

    this._updatedOldDiagnoses(payload, existingDiagnoses);
    deletedDiagnoses = this._getDeletedDiagnoses(payload, existingDiagnoses);
    return payload.concat(deletedDiagnoses);
  }

  private _createPayloadDiagnosis(codedUuid, questionExtras): DiagnosisPayload {
    const diagnosis: DiagnosisPayload = {
      diagnosis: {
        coded: codedUuid,
      },
      certainty: 'CONFIRMED',
      rank: questionExtras.questionOptions.rank,
      voided: false
    };

    return diagnosis;
  }

  private _getDeletedDiagnoses(payloadDiagnoses: Array<DiagnosisPayload>, existingDiagnoses: Array<Diagnosis>): Array<DiagnosisPayload> {
    return existingDiagnoses?.filter(e => {
      return !payloadDiagnoses.find(p => {
        let isSame = !e.voided && p.diagnosis.coded === e.diagnosis.coded.uuid;
        return isSame;
      });
    }).map(d => {
      let diagnosisPayload = this._convert(d);
      diagnosisPayload.voided = true;
      return diagnosisPayload;
    });
  }

  private _updatedOldDiagnoses(payloadDiagnoses: Array<DiagnosisPayload>, existingDiagnoses: Array<Diagnosis>) {
     payloadDiagnoses.forEach(p => {
       existingDiagnoses?.forEach(e => {
         let isSame = !e.voided && p.diagnosis.coded === e.diagnosis.coded.uuid;
         p.uuid = isSame ? e.uuid : null;
       });
     });
  }

  private _setDiagnosesValues(formDiagnosisNodes, existingDiagnoses: Array<Diagnosis>, rank: number) {
    formDiagnosisNodes?.filter(node => node.question.extras.questionOptions.rank == rank).forEach(node => {
      node['initialValue'] = existingDiagnoses;
      existingDiagnoses.filter(d => d.rank == rank).forEach((diagnosis, index) => {
        node.createChildNode();
        const value = {};
        value[node.question.key] = diagnosis.diagnosis.coded.uuid;
        const childNode = node.children[index];
        childNode.control.setValue(value);
        childNode['initialValue'] = value;
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
                    const index = formNode.children[node].nodeIndex;
                    if (question.extras && question.extras.type === 'diagnosis' && !this.formDiagnosisNodes.some(x => index === x.nodeIndex)) {
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

  private _convert(diagnosis: Diagnosis): DiagnosisPayload {
    return {
      uuid: diagnosis.uuid,
      encounter: diagnosis.encounter,
      patient: diagnosis.patient,
      diagnosis: {
        coded: diagnosis.diagnosis.coded.uuid,
        nonCoded: diagnosis.diagnosis.nonCoded,
      },
      certainty: diagnosis.certainty,
      rank: diagnosis.rank,
      voided: diagnosis.voided,
    }
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
  rank: number;
  voided?: boolean;
}

export interface DiagnosisPayload {
  uuid?: string;
  encounter?: string;
  patient?: string;
  diagnosis: {
    coded?: string;
    nonCoded?: string;
  };
  certainty: 'CONFIRMED' | 'PROVISIONAL';
  rank: number;
  voided?: boolean;
}
