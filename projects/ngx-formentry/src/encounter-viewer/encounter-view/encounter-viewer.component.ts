import { Component, OnInit, Input, Inject } from '@angular/core';
import { NodeBase, GroupNode, LeafNode } from '../../form-entry/form-factory/form-node';
import { QuestionBase } from '../../form-entry/question-models/question-base';
import * as _ from 'lodash';
import { EncounterViewerService } from '../encounter-viewer.service';
import { AfeFormGroup } from '../../abstract-controls-extension/afe-form-group';
import { DataSources } from '../../index';
import { DataSource } from '../../form-entry/question-models/interfaces/data-source';

@Component({
    selector: 'encounter-viewer',
    templateUrl: './encounter-viewer.component.html',
    styleUrls: ['./encounter-viewer.component.css'],
})
export class EncounterViewerComponent implements OnInit {
    public rootNode: NodeBase;
    public enc;
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
         console.log(this.rootNode);
    }

    constructor(private encounterViewerService: EncounterViewerService,
                @Inject(DataSources) private dataSources: DataSources) {
    }

    public ngOnInit() {
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

}
