import { Component, OnInit, Input, Inject } from '@angular/core';
import { NodeBase, GroupNode, LeafNode } from '../../form-entry/form-factory/form-node';
import { QuestionBase } from '../../form-entry/question-models/question-base';
import * as _ from 'lodash';

import { AfeFormGroup } from '../../abstract-controls-extension/afe-form-group';
import { DataSources } from '../../form-entry/data-sources/data-sources';
import { DataSource } from '../../form-entry/question-models/interfaces/data-source';

import { EncounterViewerService } from '../encounter-viewer.service';

@Component({
    selector: 'encounter-viewer',
    templateUrl: './encounter-viewer.component.html',
    styleUrls: ['./encounter-viewer.component.css'],
})
export class EncounterViewerComponent implements OnInit {
    public rootNode: NodeBase;
    public enc: any;
    public fileDataSource: DataSource;
    public remoteDataSource: DataSource;
    public customDataSource: DataSource;
    public _schema;
    @Input() public parentGroup: AfeFormGroup;
    @Input() public parentComponent: EncounterViewerComponent;
    @Input() set node(rootNode: NodeBase) {
        this.rootNode = rootNode;
    }

    @Input() public set schema(schema: any) {
        this._schema = schema;
    }

    @Input() public set encounter(enc: any) {
        this.enc = enc;
    }
     @Input() set form(form: any) {
         this.rootNode = form.rootNode;
         this._schema = form.schema;
         console.log(this.getQuestionNodes(this.traverse(this.rootNode)));
    }

    constructor(
        private encounterViewerService: EncounterViewerService,
        private dataSources: DataSources) {}
    
    getQuestionNodes(pages) {
        const merged = [];
        const arrays = [];
        for (const page of pages) {
            arrays.push(page.page);
        }
        return merged.concat.apply([], arrays);
    }
    public ngOnInit() {
        if(this.rootNode){
            
        }
        if (this.rootNode && this.rootNode.question.extras
            && this.rootNode.question.renderingType === 'file') {
                this.fileDataSource =
                this.dataSources.dataSources[this.rootNode.question.dataSource];
        } else if (this.rootNode && this.rootNode.question.extras
            && this.rootNode.question.renderingType === 'remote-select') {
                this.remoteDataSource =
                this.dataSources.dataSources[this.rootNode.question.dataSource];
            } else {
                this.customDataSource = this.encounterViewerService;
            }
    }

    public questionsAnswered(node: any) {
        const $answered = this.encounterViewerService.questionsAnswered(node);
        return $answered;
    }

    public questionAnswered(node: NodeBase) {
        const answered = this.encounterViewerService.hasAnswer(node);
        return answered;
    }

    public checkForColon(questionLabel: string) {
        if (questionLabel.indexOf(':') === -1) { return true; } else { return false; }
    }

    traverse(o, type?) {
        const questions = [];
        if (o.children) {
            if (o.children instanceof Array) {
                const returned = this.repeatingGroup(o.children);
                return returned;
            }
            if (o.children instanceof Object) {
                for (const key in o.children) {
                    if (o.children.hasOwnProperty(key)) {
                        switch (o.children[key].question.renderingType) {
                            case 'page':
                                const page = this.traverse(o.children[key]);
                                questions.push({ page: page });
                                break;
                            case 'section':
                                const section = this.traverse(o.children[key]);
                                questions.push({ section: section });
                                break;
                            case 'group':
                                const qs = this.traverse(o.children[key]);
                                questions.push({ node: o.children[key], question: o.children[key].question, groupMembers: qs });
                                break;
                            case 'repeating':
                                const rep = this.repeatingGroup(o.children[key].children);
                                questions.push({ node: o.children[key], question: o.children[key].question, groupMembers: rep });
                                break;
                            default:
                                questions.push(o.children[key]);
                                break;

                        }
                    }
                }
            }else{
                console.log('Console.log',o);
            }

        }
        return questions;
    }

    repeatingGroup(nodes) {
        const toReturn = [];
        for (const node of nodes) {
            toReturn.push({ question: node.question, groupMembers: this.traverse(node) });
        }
        return toReturn;
    }

}
