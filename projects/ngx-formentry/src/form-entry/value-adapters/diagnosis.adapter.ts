import { Injectable } from '@angular/core';

import * as _ from 'lodash';
import { Form } from '../form-factory/form';
import { ValueAdapter } from './value.adapter';
import { ArrayNode, GroupNode, LeafNode } from '../form-factory/form-node';

@Injectable()
export class DiagnosisValueAdapter implements ValueAdapter {
  formDiagnosisNodes = [];

  generateFormPayload(form: Form) {
    this.formDiagnosisNodes = [];
    this._findDiagnosisQuestionNodes(form.rootNode);
    return this._createDiagnosesPayload(
      this.formDiagnosisNodes,
      form.existingDiagnoses
    );
  }

  populateForm(form: Form, diagnoses: Array<Diagnosis>) {
    form.existingDiagnoses = diagnoses?.filter((d) => {
      return !d.voided;
    });
    this.formDiagnosisNodes = [];
    this._findDiagnosisQuestionNodes(form.rootNode);
    this._setDiagnosesValues(
      this.formDiagnosisNodes,
      form.existingDiagnoses,
      1
    );
    this._setDiagnosesValues(
      this.formDiagnosisNodes,
      form.existingDiagnoses,
      2
    );
    this.setDiagnosisGroupValue(
      this.formDiagnosisNodes,
      form.existingDiagnoses
    );
  }

  private _createDiagnosesPayload(diagnosisNodes, existingDiagnoses) {
    const payload: Array<DiagnosisPayload> = [];
    let deletedDiagnoses: Array<DiagnosisPayload> = [];
    diagnosisNodes?.forEach((node) => {
      if (node instanceof ArrayNode) {
        node.control.value
          .filter((v) => v[node.question.key])
          .forEach((value) => {
            // Create Payload
            const payloadDiagnosis = this._createPayloadDiagnosis(
              value[node.question.key],
              node.question.extras
            );
            // Validate if is new value
            payload.push(payloadDiagnosis);
          });
      }

      if (node instanceof ArrayNode) {
        const groupNodeArray = node.children;
        groupNodeArray.forEach((groupNode) => {
          if (this.hasDiagnosisNodeChanged(groupNode)) {
            const diagnosisPayload: Partial<DiagnosisPayload> = {};
            Object.values(groupNode.children).forEach((childNode: LeafNode) => {
              const {
                diagnosisType
              } = childNode.question.extras.questionOptions;
              switch (diagnosisType) {
                case 'rank':
                  diagnosisPayload.rank =
                    parseInt(childNode.control.value, 10) ?? 1;
                  break;
                case 'certainty':
                  diagnosisPayload.certainty = childNode.control.value;
                  break;
                case 'diagnosis':
                  diagnosisPayload.diagnosis = {
                    coded: childNode.control.value
                  };
                  break;
                default:
                  break;
              }
            });
            if (_.isEmpty(diagnosisPayload)) {
              return null;
            }
            if (groupNode.question.defaultValue?.uuid) {
              diagnosisPayload.uuid = groupNode.question.defaultValue.uuid;
            }
            diagnosisPayload.voided = false;
            payload.push(diagnosisPayload as DiagnosisPayload);
          }
        });
      }
    });
    this._updatedOldDiagnoses(payload, existingDiagnoses);
    deletedDiagnoses = this._getDeletedDiagnoses(payload, existingDiagnoses);
    return payload.concat(deletedDiagnoses);
  }

  private _createPayloadDiagnosis(codedUuid, questionExtras): DiagnosisPayload {
    const diagnosis: DiagnosisPayload = {
      diagnosis: {
        coded: codedUuid
      },
      certainty: 'CONFIRMED',
      rank: questionExtras.questionOptions.rank,
      voided: false
    };

    return diagnosis;
  }

  private _getDeletedDiagnoses(
    payloadDiagnoses: Array<DiagnosisPayload>,
    existingDiagnoses: Array<Diagnosis>
  ): Array<DiagnosisPayload> {
    return existingDiagnoses
      ?.filter((e) => {
        return !payloadDiagnoses.find((p) => {
          let isSame =
            !e.voided && p.diagnosis.coded === e.diagnosis.coded.uuid;
          return isSame;
        });
      })
      .map((d) => {
        let diagnosisPayload = this._convert(d);
        diagnosisPayload.voided = true;
        return diagnosisPayload;
      });
  }

  private _updatedOldDiagnoses(
    payloadDiagnoses: Array<DiagnosisPayload>,
    existingDiagnoses: Array<Diagnosis>
  ) {
    payloadDiagnoses.forEach((p) => {
      existingDiagnoses?.forEach((e) => {
        let isSame = !e.voided && p.diagnosis.coded === e.diagnosis.coded.uuid;
        p.uuid = isSame ? e.uuid : null;
      });
    });
  }

  private _setDiagnosesValues(
    formDiagnosisNodes,
    existingDiagnoses: Array<Diagnosis>,
    rank: number
  ) {
    formDiagnosisNodes
      ?.filter((node) => node.question.extras.questionOptions.rank == rank)
      .forEach((node) => {
        node['initialValue'] = existingDiagnoses;
        existingDiagnoses
          .filter((d) => d.rank == rank)
          .forEach((diagnosis, index) => {
            node.createChildNode();
            const value = {};
            value[node.question.key] = diagnosis.diagnosis.coded.uuid;
            const childNode = node.children[index];
            childNode.control.setValue(value);
            childNode['initialValue'] = value;
          });
      });
  }

  private setDiagnosisGroupValue(
    formDiagnosisNodes,
    existingDiagnoses: Array<Diagnosis>
  ) {
    for (const diagnosis of existingDiagnoses) {
      for (const diagnosisNode of formDiagnosisNodes) {
        if (diagnosisNode.question.extras.type !== 'diagnosisGroup') break;
        const groupNode = diagnosisNode.createChildNode() as GroupNode;

        groupNode.question.defaultValue = { uuid: diagnosis.uuid };
        for (const child of Object.values(groupNode.children) as LeafNode[]) {
          const diagnosisType =
            child.question.extras.questionOptions.diagnosisType;
          switch (diagnosisType) {
            case 'diagnosis':
              child.initialValue = diagnosis.diagnosis.coded?.uuid;
              child.control.setValue(diagnosis.diagnosis.coded?.uuid);
              break;
            case 'rank':
              child.initialValue = diagnosis.rank;
              child.control.setValue(diagnosis.rank);
              break;
            case 'certainty':
              child.initialValue = diagnosis.certainty;
              child.control.setValue(diagnosis.certainty);
              break;
          }
        }
      }
    }
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
                  const { children } = formNode;
                  // Condition for diagnosisGroup nodes
                  for (const node in formNode.children) {
                    const questionExtras =
                      formNode.children[node].question.extras;
                    if (questionExtras.type === 'diagnosisGroup') {
                      const arrayNode = formNode.children[node] as ArrayNode;
                      this.formDiagnosisNodes.push(arrayNode);
                      break;
                    }
                  }
                  // Condition for diagnosis nodes
                  Object.values(children).forEach((child: LeafNode) => {
                    const { question, nodeIndex } = child;
                    if (
                      question.extras?.type === 'diagnosis' &&
                      !this.formDiagnosisNodes.some(
                        (x) => x.nodeIndex === nodeIndex
                      )
                    ) {
                      this.formDiagnosisNodes.push(child);
                    }
                  });
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
        nonCoded: diagnosis.diagnosis.nonCoded
      },
      certainty: diagnosis.certainty,
      rank: diagnosis.rank,
      voided: diagnosis.voided
    };
  }

  hasDiagnosisNodeChanged(nodeAsGroup: GroupNode): boolean {
    const childrenNodes = Object.values(nodeAsGroup.children) as Array<
      LeafNode
    >;

    for (let childNode of childrenNodes) {
      if (childNode.control.value !== childNode.initialValue) {
        return true;
      }
    }

    return false;
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
