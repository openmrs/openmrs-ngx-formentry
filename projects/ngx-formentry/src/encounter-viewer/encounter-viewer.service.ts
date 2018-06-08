import { Injectable } from '@angular/core';
import { GroupNode, LeafNode, ArrayNode, NodeBase } from '../form-entry/form-factory/form-node';
import * as _ from 'lodash';
import { DataSource } from '../form-entry/question-models/interfaces/data-source';
import { Observable } from 'rxjs';
import { SelectOption } from '../form-entry/question-models/interfaces/select-option';
const comma = ', ';
const newLine = '\n';

@Injectable()
export class EncounterViewerService implements DataSource {

    constructor() {}
    public resolveSelectedValue(value: any): Observable<SelectOption> {
        return;
    }
    public searchOptions(searchText: any): Observable<SelectOption[]> {
        return;
    }
    public fileUpload(data: any): Observable<any> {
        return;
    }
    public fetchFile(url: any): Observable<any> {
        return;
    }

    public resolveSelectedValueFromSchema( answerUuid: string, schema: any): string {
        let label;
        if (schema.pages) {
            _.forEach(schema.pages, (page) => {
              const l = this.resolveSelectedValueFromSchema(answerUuid, page);
              if (l) { label = l; }
            }); }

        if (schema.sections) {
            _.forEach(schema.sections, (section) => {
                const l = this.resolveSelectedValueFromSchema(answerUuid, section);
                if (l) { label = l; }
            });
        }

        if (schema.questions) {
            _.forEach(schema.questions, (question) => {
                 if (question.questions) {
                    const l = this.resolveSelectedValueFromSchema(answerUuid, question);
                    if (l) { label = l; }
                } else {
                    if (question.questionOptions.answers) {
                    _.forEach(question.questionOptions.answers, (answer) => {
                        if (answer.concept === answerUuid) {
                            label = answer.label;
                        }
                    });
                } else if (question.questionOptions.selectableOrders) {
                    _.forEach(question.questionOptions.selectableOrders, (order) => {
                        if (order.concept === answerUuid) { label = order.label; }
                    });
                }

                }
            });
        }
        return label;


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
                if (childNode.question.renderingType === 'group') {
                   _.forEach(childNode.children, (child) => {
                       const ans = this.questionsAnswered(child, $answered);
                       if (ans) { $answered.push(ans); }
                   });
                } else if (this.hasAnswer(childNode)) { $answered.push(true); }
            });
        } else { return this.hasAnswer(node); }

        if ($answered.length > 0) {return true; } else { return false; }
    }


    public isDate(val: any) {
        if (Date.parse(val)) {
            return true;
        } else {
            return false;
        }
    }
    public convertTime(unixTimestamp: number) {
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
}
