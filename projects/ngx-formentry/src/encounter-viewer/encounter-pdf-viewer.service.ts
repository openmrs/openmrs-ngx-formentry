import { Injectable } from '@angular/core';

import { Form } from '../form-entry/form-factory/form';
import { ObsValueAdapter } from '../form-entry/value-adapters/obs.adapter';
import { EncounterViewerService } from './encounter-viewer.service';
import { DataSources } from '../form-entry/data-sources/data-sources';
import { DataSource } from '../form-entry/question-models/interfaces/data-source';

import { combineLatest, BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import * as moment_ from 'moment';
import * as _ from 'lodash';
import * as pdfMake from 'pdfmake/build/pdfmake.js';
import 'pdfmake/build/vfs_fonts.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

const moment = moment_;

@Injectable({
  providedIn: 'root'
})

export class EncounterPdfViewerService {
  private remoteDataSource: DataSource;
  public error: boolean;
  public errorMessage: string;
  public showLoader: boolean;
  public subscribedAnswers: any = {
    questions: {
      stack: []
    },
    answers: []
  };

  constructor(
    private encounterViewerService: EncounterViewerService,
    private obsValueAdapter: ObsValueAdapter,
    private dataSources: DataSources
  ) {}

  getPages(pages: any, form: Form, remoteSelectsOnly?: boolean, remoteAns?: any): any[] {
    const content = [];
    let remoteQuestions = [];

    for (const page of pages) {
      if (remoteSelectsOnly) {
        remoteQuestions = remoteQuestions.concat(this.getSections(page.page, form, false, remoteAns));
      } else {
        for (const question of form.rootNode.question.questions) {
          if (page.label === form.rootNode.children[question.key].question.label &&
            this.encounterViewerService.questionsAnswered(form.rootNode.children[question.key])) {
            content.push({
              style: 'tableExample',
              table: {
                widths: ['*'],
                headerRows: 1,
                keepWithHeaderRows: 1,
                body: [
                  [{ text: page.label, style: 'tableHeader' }],
                  [
                    {
                      style: 'tableExample',
                      table: {
                        widths: ['*'],
                        body: this.getSections(page.page, form, true, remoteAns)
                      },
                      layout: 'noBorders',
                      margin: [5, 0, 0, 0]
                    }
                  ]
                ]
              },
              layout: {
                hLineWidth: function(i, node) {
                  return (i === 0 || i === node.table.body.length) ? 0.5 : 0.5;
                },
                vLineWidth: function(i, node) {
                  return (i === 0 || i === node.table.widths.length) ? 0.5 : 0.5;
                },
                hLineColor: function(i, node) {
                  return (i === 0 || i === node.table.body.length) ? '#ddd' : '#ddd';
                },
                vLineColor: function(i, node) {
                  return (i === 0 || i === node.table.body.length) ? '#ddd' : '#ddd';
                }
              }
            });
          }
        }
      }
    }
    return remoteSelectsOnly ? remoteQuestions : content;
  }

  getSections(sections: any, form: Form, resolve: any, remoteAns: any): any[] {
    const content = [];
    const answeredSections = [];
    let questions: Array<Observable<any>> = [];

    sections.map(s => {
      if (this.encounterViewerService.questionsAnswered(s.node)) {
        answeredSections.push(s);
      }
    });

    for (const section of answeredSections) {
      questions = questions.concat(this.getRemoteSectionData(section.section));
    }

    if (resolve && remoteAns) {
      for (const section of answeredSections) {
        content.push([
          {
            table: {
              widths: ['*'],
              body: [
                [{ text: section.label, style: 'tableSubheader' }],
                [ this.getSectionData(section.section, remoteAns, form) ]
              ]
            },
            layout: 'noBorders'
          }
        ]);
      }
      return content;
    } else {
      return questions;
    }
  }

  private appendResolvedAnswer(resolvedAnswer: any, questions: any, node?: any) {
    if (resolvedAnswer) {
      questions.stack.push({
        text: [
          `${(node) ? node.question.label : 'Question label' }${
            (node) ? (node.question.label.indexOf(':') > 1 ? '' : ':') : ''
          } `,
          { text: `${resolvedAnswer}`, bold: true }
        ], style: 'answers'
      });
    }
  }

  // get remote selects only
  getRemoteSectionData(section: any): any {
    const questions: Array<Observable<any>> = [];
    this.subscribedAnswers.questions.stack = [];

    for (const node of section) {
      if (node.question.renderingType === 'remote-select') {
        this.remoteDataSource = this.dataSources.dataSources[node.question.dataSource];
        if (node.control.value !== '') {
          if (this.remoteDataSource) {
            questions.push(this.remoteDataSource.resolveSelectedValue(node.control.value));
          }
        }
      }
    }
    return questions;
  }

  // merge remote selects
  getSectionData(section: any, remoteAns: any[], form: Form): any {
    const questions = {
      stack: []
    };

    let resolvedAnswer = '';

    for (const node of section) {
      switch (node.question.renderingType) {
        case 'group':
          if (node.groupMembers) {
            questions.stack.push(this.getSectionData(node.groupMembers, remoteAns, form));
          }
          break;

        case 'field-set':
          if (node.children) {
            const groupMembers = [];
            const result = Object.keys(node.children).map((key) => node.children[key]);

            if (result) {
              groupMembers.push(result);
              questions.stack.push(this.getSectionData(groupMembers[0], remoteAns, form));
            }
          }
          break;

        case 'repeating':
          if (node.groupMembers) {
            questions.stack.push(this.getSectionData(node.groupMembers, remoteAns, form));
          }
          break;

        case 'remote-select':
          this.remoteDataSource = this.dataSources.dataSources[node.question.dataSource];
          for (const ans of remoteAns) {
            if (ans.value === node.control.value) {
              this.appendResolvedAnswer(ans.label, questions, node);
            }
          }
          break;

        default:
          const answer = node.control.value;
          if (answer) {
            resolvedAnswer = this.resolveValue(answer, form);
            this.appendResolvedAnswer(resolvedAnswer, questions, node);
          }
      }
    }

    return questions;
  }

  resolveValue(answer: any, form: Form, arrayElement?: boolean): any {
    if (answer !== '') {
      if (this.isUuid(answer)) {
        const val = this.encounterViewerService.resolveSelectedValueFromSchema(answer, form.schema);
        if (!arrayElement) {
          if (val) {
            return val.toUpperCase();
          } else {
            return answer;
          }
        } else {
          return val;
        }
      } else if (_.isArray(answer)) {
        const arr = [];
        _.forEach(answer, elem => {
          arr.push(this.resolveValue(elem, form, true));
        });
        return arr.toString();
      } else if (this.isDate(answer)) {
        if (!arrayElement) {
          return this.encounterViewerService.convertTime(answer);
        } else {
          return this.encounterViewerService.convertTime(answer);
        }
      } else if (typeof answer === 'object') {
        const values = [];
        const result = Object.keys(answer).map((key) => [key, answer[key]]);

        values.push(result);
        return values;
      } else {
       return answer;
      }
    }
  }

  generatePdfDefinition(form: Form): any {
    const docDefinition$ = new BehaviorSubject<any>({});
    const remoteSelects = this.getPages((this.obsValueAdapter.traverse(form.rootNode)), form, true);

    combineLatest(remoteSelects).subscribe(remoteAns => {
      if (remoteAns) {
        const docDefinition = {
          pageSize: 'A4',
          content: this.getPages(this.obsValueAdapter.traverse(form.rootNode), form, false, remoteAns),
          styles: {
            answers: {
              fontSize: 8
            },
            banner: {
              fontSize: 9,
              bold: true,
              margin: [50, 15, 30, 0]
            },
            bannerItem: {
              margin: [2, 2, 2, 2]
            },
            bannerLabel: {
              color: '#2f4f4f'
            },
            confidential: {
              color: 'red',
              fontSize: 8,
              bold: true,
              margin: [60, 0, 0, 0]
            },
            footer: {
              alignment: 'center',
              fontSize: 8,
              bold: true
            },
            header: {
              fontSize: 9,
              bold: true,
              margin: [5, 5, 5, 5]
            },
            pageNumber: {
              color: '#2f4f4f',
              fontSize: 6
            },
            tableExample: {
              fontSize: 10,
              margin: [5, 0, 0, 5]
            },
            tableHeader: {
              fillColor: '#f5f5f5',
              width: ['100%'],
              borderColor: '#333',
              fontSize: 9,
              bold: true,
              margin: [5, 0, 5, 0]
            },
            tableSubheader: {
              fillColor: '#337ab7',
              width: ['100%'],
              fontSize: 9,
              color: 'white',
              margin: [5, 0, 5, 0]
            },
            timestamp: {
              bold: true,
              color: '#2f4f4f'
            }
          },
          defaultStyle: {
            fontSize: 7
          }
        };
        docDefinition$.next(docDefinition);
      }
    });

    return docDefinition$;
  }

  displayPdf(form) {
    const pdf = pdfMake;
    let patient;
    pdf.vfs = pdfFonts.pdfMake.vfs;

    if (form.dataSourcesContainer.dataSources._dataSources) {
      patient = form.dataSourcesContainer.dataSources._dataSources['patientInfo'];
    }

    this.generatePdfDefinition(form).subscribe(docDefinition => {
      if (!(_.isEmpty(docDefinition))) {
        if (typeof patient !== 'undefined') {
          const banner = [];

          if (patient.name) {
            banner.push({
              text: [
                { text: 'Name: ', style: 'bannerLabel' },
                { text: `${this.titleize(patient.name)}` }
              ],
              style: 'bannerItem'
            });
          }

          if (patient.nid) {
            banner.push({
              text: [
                { text: 'ID: ', style: 'bannerLabel' },
                { text: `${patient.nid}` }
              ],
              style: 'bannerItem'
            });
          }

          if (patient.birthdate) {
            banner.push({
              text: [
                { text: 'DOB: ', style: 'bannerLabel' },
                { text: `${moment(patient.birthdate).format('l')} (${patient.age} yo)` }
              ],
              style: 'bannerItem'
            });
          }

          if (patient.mui) {
            banner.push({
              text: [
                { text: 'MUI: ', style: 'bannerLabel' },
                { text: `${patient.mui}` }
              ],
              style: 'bannerItem'
            });
          }

          if (patient.mhn) {
            banner.push({
              text: [
                { text: 'MTRH No: ', style: 'bannerLabel' },
                { text: `${patient.mhn}` }
              ],
              style: 'bannerItem'
            });
          }

          docDefinition.header = {
            style: 'banner',
            table: {
              body: [ banner ]
            },
            layout: 'noBorders'
          };
        }

        docDefinition.footer = (currentPage, pageCount) => {
          return 	{
            style: 'footer',
            widths: ['*', 'auto'],
            table: {
              body: [
                [
                  {
                    text: 'Note: Confidentiality is one of the core duties of all medical practitioners. '
                      + 'Patients\' personal health information should be kept private.', style: 'confidential'
                  }, ''
                ],
                [
                  { text: `Generated on ${new Date().toUTCString()}`, style: 'timestamp' },
                  { text: `${currentPage.toString()} of ${pageCount}`, style: 'pageNumber' }
                ],
              ]
            },
            layout: 'noBorders'
          };
        };

        const win = window.open('', '_blank');
        pdf.createPdf(docDefinition).open({}, win);
      }
    }, (error) => {
      console.log('Error: ', error);
    });
  }

  isDate(val: any) {
    return moment(val, moment.ISO_8601, true).isValid();
  }

  isUuid(value: string) {
    return (value.length === 36 && value.indexOf(' ') === -1 && value.indexOf('.') === -1);
  }

  titleize(str) {
    return str.replace(/\w\S*/g, s => s.charAt(0).toUpperCase() + s.substr(1).toLowerCase());
  }
}
