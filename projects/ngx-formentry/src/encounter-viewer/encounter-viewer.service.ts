import { Injectable } from '@angular/core';
import { GroupNode, LeafNode, ArrayNode, NodeBase } from '../form-entry/form-factory/form-node';
import * as _ from 'lodash';

const comma = ', ';
const newLine = '\n';
@Injectable()
export class EncounterViewerService {
    constructor() { }

    public traverse(node: any, schema: any, initialValue?: any) {
        let answer = initialValue || '';
        if (node.question.renderingType === 'form' || node.question.renderingType === 'page'
         || node.question.renderingType === 'section') {
            _.forEach(node.children, (childNode) => {
                this.traverse(childNode, schema);
            });
         } else {
            if (this.hasAnswer(node)) {
              if (node instanceof ArrayNode) {
                _.forEach(node.children, (childNode) => {
                     answer = this.traverse(childNode, schema, answer);
                });
            }  else if (node instanceof LeafNode || node instanceof GroupNode) {

              answer += this.getAnswers(node.initialValue, '', schema);
          }

        }
            node.initialValue = answer.toUpperCase();
    }
        return answer;
    }

    public hasAnswer(node: NodeBase) {
        let answered = false;
        if (node.initialValue) {
            answered = true;
        }
        return answered;
    }

    public questionsAnswered(node: any, answered?: boolean[]) {
        const $answered = answered || [];
        if (node.question.renderingType === 'page') {
            _.forEach(node.children, (childNode: any) => {
                this.questionsAnswered(childNode, $answered); });

        } else if (node.question.renderingType === 'section') {
            _.forEach(node.children, (childNode) => {
                if (this.hasAnswer(childNode)) { $answered.push(true); }
            }); } else {
                return this.hasAnswer(node);
            }
        if ($answered.length > 0) {return true; } else { return false; }
    }

    private getAnswers(initialValue: any, separator: string, schema: any): string {
        let answer = '';
        if (initialValue.value) {
            if (this.isConcept(initialValue.value)) {
              const a = this.findFormAnswerLabel(initialValue.concept.uuid,
                                                 initialValue.value.uuid, schema);
              if (a) { answer += a + separator;
            } else { answer = initialValue.value.display + comma; }
            } else {
              answer += this.getAnswers(initialValue.value, '', schema);
            }
          } else if (_.isNumber(initialValue)) {
              answer += initialValue + separator;

          } else if (this.isDate(initialValue)) {
              answer += this.convertTime(initialValue);

          } else if (initialValue.groupMembers) {
              if (initialValue.groupMembers.length === 1) {
                  answer += this.getAnswers(initialValue.groupMembers[0], newLine, schema);
              } else {
                _.forEach(initialValue.groupMembers, (groupMember) => {
                    answer += newLine + newLine + groupMember.display + newLine;
                });
              }

          } else if (_.isArray(initialValue)) {
            _.forEach(initialValue, (val) => {
                answer += this.getAnswers(val, comma , schema);
            });
          } else if (_.isString(initialValue)) {
              return initialValue + separator;
        }
        return answer;
    }

    private isConcept(value: any) {
        if (value.uuid) {
            return true;
        } else {
            return false;
        }
    }

    private isDate(val: any) {
        if (Date.parse(val)) {
            return true;
        } else {
            return false;
        }
    }
    private convertTime(unixTimestamp: number) {
        const a = new Date(unixTimestamp);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
                        'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const year = a.getFullYear();
        const month = months[a.getMonth()];
        const date = a.getDate();
        const hour = a.getHours();
        const min = a.getMinutes();
        const sec = a.getSeconds();
        const suffix = hour < 12 ? 'AM' : 'PM';
        let time;
        if (hour === 0 && min === 0) {
            time = date + ' ' + month + ' ' + year;
        } else {
            time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + suffix + ' (EAT)';
        }
        return time;

    }

    private findFormAnswerLabel(questionUuid: string,
                                answerUuid: string,
                                schema: any,
                                ): string {

        let label;
        if (schema.pages) {
            _.forEach(schema.pages, (page) => {
              const l = this.findFormAnswerLabel(questionUuid, answerUuid, page);
              if (l) { label = l; }
            }); }

        if (schema.sections) {
            _.forEach(schema.sections, (section) => {
                const l = this.findFormAnswerLabel(questionUuid, answerUuid, section);
                if (l) { label = l; }
            });
        }

        if (schema.questions) {
            _.forEach(schema.questions, (question) => {
                 if (question.questions) {
                    const l = this.findFormAnswerLabel(questionUuid, answerUuid, question);
                    if (l) { label = l; }
                } else {
                    if (question.questionOptions.concept === questionUuid
                    && question.questionOptions.answers) {
                    _.forEach(question.questionOptions.answers, (answer) => {
                        if (answer.concept === answerUuid) {
                            label = answer.label;
                        }
                    });
                }
                }
            });
        }
        return label;

    }


}
